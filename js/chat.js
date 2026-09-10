/**
 * VoyAgent Chat Stream & Agent Tool-Calling Simulation
 * FIT3161 - Personal AI Travel Companion
 */

class VoyAgentChat {
  constructor(app) {
    this.app = app;
    this.messagesContainer = document.getElementById("messages-feed");
    this.textarea = document.getElementById("chat-prompt-input");
    this.sendBtn = document.getElementById("btn-send");
    this.isStreaming = false;

    this.initEvents();
  }

  initEvents() {
    if (this.textarea) {
      this.textarea.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          this.handleSend();
        }
      });

      // Auto-expand textarea
      this.textarea.addEventListener("input", () => {
        this.textarea.style.height = "24px";
        this.textarea.style.height = Math.min(this.textarea.scrollHeight, 120) + "px";
      });
    }

    if (this.sendBtn) {
      this.sendBtn.addEventListener("click", () => this.handleSend());
    }
  }

  handleSend() {
    const text = this.textarea.value.trim();
    if (!text || this.isStreaming) return;

    this.textarea.value = "";
    this.textarea.style.height = "24px";

    // Hide welcome hero if still visible
    const hero = document.getElementById("welcome-hero-state");
    if (hero) hero.style.display = "none";

    // Append user message
    this.appendUserMessage(text);

    // Simulate Agent Thinking & Tool Calling
    this.simulateAgentResponse(text);
  }

  appendUserMessage(text) {
    const row = document.createElement("div");
    row.className = "message-row user";
    row.innerHTML = `
      <div class="message-content">
        <div class="message-bubble">${this.escapeHtml(text)}</div>
      </div>
      <div class="message-avatar user-avatar">ME</div>
    `;
    this.messagesContainer.appendChild(row);
    this.scrollToBottom();
  }

  appendAgentMessageWithTools({ content, tools = [] }) {
    const row = document.createElement("div");
    row.className = "message-row agent";

    let toolsHtml = "";
    if (tools.length > 0) {
      toolsHtml = `
        <div class="tool-execution-box">
          <div class="tool-header-toggle">
            <span>✨ Trip Preparation & Planning Steps</span>
            <span class="tool-badge-counter">${tools.length} Checks Completed</span>
          </div>
          <div class="tool-steps-list">
            ${tools.map(t => `
              <div class="tool-step-item">
                <div class="step-left">
                  <span class="step-icon">${t.icon || '✓'}</span>
                  <span>${t.step}</span>
                </div>
                <span class="step-status-ok">✔ ${t.detail}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    row.innerHTML = `
      <div class="message-avatar agent-avatar">VA</div>
      <div class="message-content">
        ${toolsHtml}
        <div class="message-bubble">${this.formatMarkdown(content)}</div>
      </div>
    `;

    this.messagesContainer.appendChild(row);
    this.scrollToBottom();
  }

  simulateAgentResponse(promptText) {
    this.isStreaming = true;
    if (this.sendBtn) this.sendBtn.disabled = true;

    // Show temporary typing row
    const typingRow = document.createElement("div");
    typingRow.className = "message-row agent typing-row";
    typingRow.innerHTML = `
      <div class="message-avatar agent-avatar">VA</div>
      <div class="message-content">
        <div class="message-bubble typing-dots">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
    `;
    this.messagesContainer.appendChild(typingRow);
    this.scrollToBottom();

    // Determine context
    const isMelbourne = promptText.toLowerCase().includes("melbourne");
    const tripKey = isMelbourne ? "melbourne" : "kyoto";
    const targetTrip = window.VOYAGENT_DATA.trips[tripKey];

    setTimeout(() => {
      // Remove typing row
      if (typingRow.parentNode) {
        typingRow.parentNode.removeChild(typingRow);
      }

      // Friendly travel planning steps (No developer code syntax)
      const defaultTools = [
        { icon: "📍", step: `Curated top-rated cultural highlights & dining for ${targetTrip.destination}`, detail: "16 places selected" },
        { icon: "🌤️", step: "Checked seasonal weather forecast & rain probability", detail: "Outlook analyzed" },
        { icon: "🗺️", step: "Mapped scenic walking routes and transit connections", detail: "Routes optimized" },
        { icon: "💰", step: "Balanced estimated costs with your target budget", detail: `Within ${targetTrip.budget.total}` }
      ];

      this.appendAgentMessageWithTools({
        content: `I have synthesized your preferences and created a comprehensive travel blueprint for **${targetTrip.destination}**!\n\n` +
                 `- **Duration**: ${targetTrip.duration}\n` +
                 `- **Estimated Budget**: ${targetTrip.budget.total} (Optimal allocation: ${targetTrip.budget.allocated})\n` +
                 `- **Weather Outlook**: Clear and mild, with live weather tracking activated.\n\n` +
                 `You can explore the day-by-day interactive timeline below or interact directly with the route map in the right workspace.`,
        tools: defaultTools
      });

      // Load itinerary card into DOM
      this.app.loadTrip(tripKey);
      this.isStreaming = false;
      if (this.sendBtn) this.sendBtn.disabled = false;
    }, 1200);
  }

  sendPresetPrompt(promptText) {
    if (this.textarea) {
      this.textarea.value = promptText;
      this.handleSend();
    }
  }

  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  escapeHtml(str) {
    return str.replace(/[&<>"']/g, function(m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
  }

  formatMarkdown(str) {
    let formatted = this.escapeHtml(str);
    // Bold
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Bullet list
    formatted = formatted.replace(/^- (.*$)/gim, '• $1<br>');
    // Line breaks
    formatted = formatted.replace(/\n\n/g, '<br><br>');
    formatted = formatted.replace(/\n/g, '<br>');
    return formatted;
  }
}

window.VoyAgentChat = VoyAgentChat;
