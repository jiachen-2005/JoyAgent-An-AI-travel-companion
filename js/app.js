/**
 * VoyAgent Main Application Controller
 * FIT3161 - Personal AI Travel Companion
 */

class VoyAgentApp {
  constructor() {
    this.map = null;
    this.itinerary = null;
    this.chat = null;
    this.currentTripKey = "kyoto";
    this.activeWorkspaceTab = "map";

    document.addEventListener("DOMContentLoaded", () => this.init());
  }

  init() {
    // 1. Initialize Map
    this.map = new VoyAgentMap("leaflet-map");
    this.map.init();

    // 2. Initialize Itinerary Engine
    this.itinerary = new VoyAgentItinerary(this);

    // 3. Initialize Chat Stream
    this.chat = new VoyAgentChat(this);

    // 4. Setup Global UI Events
    this.setupUIEvents();

    // 5. Restore Theme
    this.initTheme();

    // 6. Load Initial Default Trip
    this.loadTrip(this.currentTripKey);
  }

  setupUIEvents() {
    // Sidebar Toggle
    const btnToggleSidebar = document.getElementById("btn-toggle-sidebar");
    const sidebar = document.getElementById("sidebar-panel");
    if (btnToggleSidebar && sidebar) {
      btnToggleSidebar.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
      });
    }

    // Workspace Toggle
    const btnToggleWorkspace = document.getElementById("btn-toggle-workspace");
    const workspace = document.getElementById("workspace-panel");
    if (btnToggleWorkspace && workspace) {
      btnToggleWorkspace.addEventListener("click", () => {
        workspace.classList.toggle("collapsed");
        setTimeout(() => {
          if (this.map && this.map.map) this.map.map.invalidateSize();
        }, 300);
      });
    }

    // Theme Switch
    const btnThemeToggle = document.getElementById("btn-theme-toggle");
    if (btnThemeToggle) {
      btnThemeToggle.addEventListener("click", () => this.toggleTheme());
    }

    // New Trip Button
    const btnNewTrip = document.getElementById("btn-new-trip");
    if (btnNewTrip) {
      btnNewTrip.addEventListener("click", () => this.startNewTrip());
    }

    // Workspace Tabs
    const tabBtns = document.querySelectorAll(".workspace-nav-tabs .tab-btn");
    tabBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const tab = btn.dataset.tab;
        this.switchWorkspaceTab(tab);
      });
    });

    // Travel Persona Selector
    const personaChips = document.querySelectorAll(".persona-chip");
    personaChips.forEach(chip => {
      chip.addEventListener("click", () => {
        personaChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        this.showToast(`Switched persona to: ${chip.dataset.persona}`);
      });
    });

    // Export Button
    const btnExport = document.getElementById("btn-export-trip");
    if (btnExport) {
      btnExport.addEventListener("click", () => this.exportCurrentTrip());
    }
  }

  initTheme() {
    const savedTheme = localStorage.getItem("voyagent-theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    this.updateThemeButton(savedTheme);
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("voyagent-theme", next);
    this.updateThemeButton(next);
  }

  updateThemeButton(theme) {
    const icon = document.getElementById("theme-icon");
    if (icon) {
      icon.textContent = theme === "dark" ? "🌙" : "☀️";
    }
  }

  switchWorkspaceTab(tabName) {
    this.activeWorkspaceTab = tabName;

    // Update tab button classes
    document.querySelectorAll(".workspace-nav-tabs .tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tabName);
    });

    // Update view containers
    document.querySelectorAll(".workspace-view").forEach(view => {
      view.classList.toggle("active", view.id === `${tabName}-view-container`);
    });

    if (tabName === "map" && this.map && this.map.map) {
      setTimeout(() => this.map.map.invalidateSize(), 150);
    }
  }

  loadTrip(tripKey) {
    const tripData = window.VOYAGENT_DATA.trips[tripKey];
    if (!tripData) return;

    this.currentTripKey = tripKey;

    // Update trip title chip in header
    const titleChip = document.getElementById("header-trip-title");
    if (titleChip) titleChip.textContent = tripData.title;

    // Update active history item in sidebar
    document.querySelectorAll(".trip-item").forEach(item => {
      item.classList.toggle("active", item.dataset.trip === tripKey);
    });

    // Load Itinerary View
    this.itinerary.loadTrip(tripData);

    // Update Budget Panel
    this.renderBudgetPanel(tripData.budget);

    // Update Weather Radar Panel
    this.renderWeatherPanel(tripData.weatherForecast, tripData.destination);
  }

  renderBudgetPanel(budget) {
    const container = document.getElementById("budget-panel-root");
    if (!container || !budget) return;

    container.innerHTML = `
      <div class="budget-panel-content">
        <div class="budget-hero-stat">
          <span class="budget-total-label">Total Allocated Trip Budget</span>
          <span class="budget-total-amount">${budget.total}</span>
          <div class="budget-progress-track">
            <div class="budget-progress-fill" style="width: ${budget.percentUsed}%;"></div>
          </div>
          <div class="budget-meta-row">
            <span>Spent / Planned: ${budget.allocated}</span>
            <span>${budget.percentUsed}% Utilized</span>
          </div>
        </div>

        <div class="budget-category-list">
          <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary);">
            Category Expense Breakdown
          </div>
          ${budget.breakdown.map(item => `
            <div class="budget-category-row">
              <div class="cat-info">
                <div class="cat-icon-box">${item.icon}</div>
                <div>
                  <div class="cat-label">${item.category}</div>
                  <div class="cat-sub">${item.share} of total spending</div>
                </div>
              </div>
              <div class="cat-amount">${item.amount}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderWeatherPanel(forecast, destination) {
    const container = document.getElementById("weather-panel-root");
    if (!container || !forecast) return;

    const today = forecast[0] || {};

    container.innerHTML = `
      <div class="weather-panel-content">
        <div class="weather-current-card">
          <div>
            <div class="weather-temp">${today.temp ? today.temp.split('/')[0] : '20°C'}</div>
            <div class="weather-city">📍 ${destination}</div>
            <div style="font-size: 0.85rem; opacity: 0.9; margin-top: 4px;">${today.condition || 'Clear'}</div>
          </div>
          <div style="font-size: 3.5rem;">${today.icon || '☀️'}</div>
        </div>

        <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary); margin-top: var(--space-2);">
          4-Day Forecast & Trip Safety Radar
        </div>

        <div class="weather-forecast-grid">
          ${forecast.map(item => `
            <div class="forecast-card ${item.alert ? 'alert-card' : ''}">
              <div class="forecast-day">
                <span>${item.day}</span>
                <span>${item.rain} 🌧️</span>
              </div>
              <div class="forecast-condition">
                <span>${item.icon}</span>
                <span style="font-size: 0.82rem; font-weight: 600;">${item.temp}</span>
              </div>
              ${item.alert ? `
                <div style="font-size: 0.7rem; color: var(--danger-500); font-weight: 700;">
                  ⚠️ ${item.alertText}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  startNewTrip() {
    // Clear itinerary and show hero
    const itineraryRoot = document.getElementById("active-itinerary-root");
    if (itineraryRoot) itineraryRoot.innerHTML = "";

    const hero = document.getElementById("welcome-hero-state");
    if (hero) hero.style.display = "flex";

    const titleChip = document.getElementById("header-trip-title");
    if (titleChip) titleChip.textContent = "New Trip Session";

    document.querySelectorAll(".trip-item").forEach(i => i.classList.remove("active"));
    this.showToast("✨ Started new travel planning session!");
  }

  exportCurrentTrip() {
    const trip = window.VOYAGENT_DATA.trips[this.currentTripKey];
    if (!trip) return;

    let md = `# VoyAgent Travel Blueprint: ${trip.title}\n\n`;
    md += `- **Destination**: ${trip.destination}\n`;
    md += `- **Duration**: ${trip.duration}\n`;
    md += `- **Total Budget**: ${trip.budget.total}\n\n`;

    trip.days.forEach(d => {
      md += `## ${d.dateTitle}\n\n`;
      d.slots.forEach(s => {
        md += `### ${s.time} - ${s.title} (${s.category})\n`;
        md += `${s.desc}\n`;
        md += `- **Cost**: ${s.cost} | **Rating**: ${s.rating}\n\n`;
      });
    });

    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `VoyAgent_${this.currentTripKey}_itinerary.md`;
    a.click();
    URL.revokeObjectURL(url);

    this.showToast("📄 Exported itinerary as Markdown file!");
  }

  showToast(message, type = "normal") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <span style="font-size: 1.1rem;">${type === 'info' ? '⚡' : '📌'}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3800);
  }
}

window.voyAgentApp = new VoyAgentApp();
