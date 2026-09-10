/**
 * VoyAgent Itinerary Controller & Dynamic Replanning Simulation Engine
 * FIT3161 - Personal AI Travel Companion
 */

class VoyAgentItinerary {
  constructor(app) {
    this.app = app;
    this.currentTrip = null;
    this.activeDay = 1;
    this.isReplannedDay2 = false;
  }

  loadTrip(tripData) {
    this.currentTrip = JSON.parse(JSON.stringify(tripData)); // clone
    this.activeDay = 1;
    this.isReplannedDay2 = false;
    this.render();
  }

  render() {
    const container = document.getElementById("active-itinerary-root");
    if (!container || !this.currentTrip) return;

    const trip = this.currentTrip;
    const currentDayData = trip.days.find(d => d.dayNumber === this.activeDay) || trip.days[0];

    container.innerHTML = `
      <div class="itinerary-card-container">
        <!-- Trip Header -->
        <div class="trip-summary-header">
          <div class="trip-title-group">
            <h3>📍 ${trip.title}</h3>
            <div class="trip-subtitle">${trip.destination} · ${trip.duration} · Budget: ${trip.budget.total}</div>
          </div>
          <div class="trip-badges-row">
            ${trip.tags.map(t => `<span class="badge-tag">${t}</span>`).join('')}
            <span class="badge-tag accent">✨ AI Tailored</span>
          </div>
        </div>

        <!-- Day Selector Tabs -->
        <div class="itinerary-day-nav">
          ${trip.days.map(d => `
            <button class="day-tab-btn ${d.dayNumber === this.activeDay ? 'active' : ''}" onclick="voyAgentApp.itinerary.switchDay(${d.dayNumber})">
              <span>Day ${d.dayNumber}</span>
              <span class="day-tab-sub">${trip.weatherForecast[d.dayNumber - 1] ? trip.weatherForecast[d.dayNumber - 1].icon + ' ' + trip.weatherForecast[d.dayNumber - 1].temp.split('/')[0] : ''}</span>
            </button>
          `).join('')}
        </div>

        <!-- Dynamic Replanning Simulation Banner (Highlighting FYP Feature) -->
        ${this.activeDay === 2 && trip.id === 'kyoto' ? `
          <div class="replanning-simulation-banner">
            <div class="replanning-text">
              <span class="replanning-title">
                ⚡ Agentic Dynamic Replanning Simulator
              </span>
              <span class="replanning-desc">
                ${this.isReplannedDay2 
                  ? '✅ Active: Heavy rain detected. AI has dynamically swapped outdoor mountain hikes with indoor cultural heritage.'
                  : 'Simulate unexpected trip disruptions to experience real-time AI weather adaptation.'}
              </span>
            </div>
            <div class="replanning-actions">
              ${!this.isReplannedDay2 ? `
                <button class="btn-simulate-event" onclick="voyAgentApp.itinerary.triggerRainReplanning()">
                  🌧️ Simulate Heavy Rain (14:00)
                </button>
              ` : `
                <button class="btn-simulate-event" onclick="voyAgentApp.itinerary.revertDay2()">
                  🔄 Revert to Original Plan
                </button>
              `}
            </div>
          </div>
        ` : ''}

        <!-- Timeline Slots -->
        <div class="timeline-container">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: var(--space-2);">
            ${currentDayData.dateTitle}
          </h4>

          ${currentDayData.slots.map((slot, index) => `
            <div class="timeline-item">
              <div class="timeline-left-marker">
                <div class="slot-circle">${index + 1}</div>
                ${index < currentDayData.slots.length - 1 ? '<div class="timeline-connector-line"></div>' : ''}
              </div>

              <div class="activity-card ${slot.replanned ? 'replanned-highlight' : ''}" id="card-${slot.id}">
                <div class="activity-header">
                  <div class="activity-time-slot">
                    <span>⏰ ${slot.time}</span>
                    <span style="opacity: 0.6;">·</span>
                    <span>${slot.category}</span>
                  </div>
                  ${slot.replanned ? '<span class="replanned-badge">⚡ Replanned for Rain</span>' : ''}
                </div>

                <div class="activity-title">
                  <span>${slot.title}</span>
                </div>

                <div class="activity-desc">${slot.desc}</div>

                <div class="activity-footer">
                  <div class="activity-cost">
                    <span>💵 ${slot.cost}</span>
                    <span style="opacity: 0.5;">|</span>
                    <span>⭐ ${slot.rating}</span>
                  </div>
                  <div class="activity-actions">
                    <button class="btn-card-action" onclick="voyAgentApp.itinerary.locateOnMap('${slot.id}', [${slot.coords}])">
                      🗺️ Locate
                    </button>
                  </div>
                </div>
              </div>
            </div>

            ${slot.transitNext ? `
              <div class="transit-step">
                <span class="transit-icon">↳</span>
                <span class="transit-info">${slot.transitNext.info}</span>
              </div>
            ` : ''}
          `).join('')}
        </div>
      </div>
    `;

    // Sync map route
    if (this.app.map) {
      this.app.map.renderDayRoute(currentDayData.slots, this.activeDay);
    }
  }

  switchDay(dayNumber) {
    this.activeDay = dayNumber;
    this.render();
  }

  locateOnMap(slotId, coords) {
    if (this.app.map) {
      this.app.map.focusSlot(slotId, coords);
      this.app.switchWorkspaceTab("map");
      this.app.showToast("📍 Focused on map: " + slotId);
    }
  }

  triggerRainReplanning() {
    this.app.showToast("🌦️ Weather disruption triggered! Agent replanning...", "info");

    // Add replanning message in chat stream with tool-call animation
    const replanData = window.VOYAGENT_DATA.replannedKyotoDay2;
    
    if (this.app.chat) {
      this.app.chat.appendAgentMessageWithTools({
        content: `⚠️ **Weather Alert Triggered!** A severe rainstorm (85% precipitation, 18mm) has been detected for Kyoto on **Day 2 at 14:00**.\n\n` +
                 `I have dynamically analyzed your preferences and safety constraints. The outdoor hike to **Iwatayama Monkey Park** and **Kinkaku-ji** outdoor grounds have been replaced with **Kyoto National Museum** (climate-controlled Meiji wing) and **Nishiki Market** (400m fully covered dining arcade). Transit routes have been updated to sheltered subway and tram connections.`,
        tools: replanData.toolCalls
      });
    }

    // Apply replanned slots
    const day2 = this.currentTrip.days.find(d => d.dayNumber === 2);
    if (day2) {
      day2.slots = replanData.newSlots;
      this.isReplannedDay2 = true;
      this.render();
    }
  }

  revertDay2() {
    const originalTrip = window.VOYAGENT_DATA.trips.kyoto;
    const day2 = this.currentTrip.days.find(d => d.dayNumber === 2);
    if (day2) {
      day2.slots = JSON.parse(JSON.stringify(originalTrip.days[1].slots));
      this.isReplannedDay2 = false;
      this.render();
      this.app.showToast("🔄 Reverted to original outdoor itinerary.");
    }
  }
}

window.VoyAgentItinerary = VoyAgentItinerary;
