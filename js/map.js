/**
 * VoyAgent Map Controller
 * Leaflet.js wrapper for interactive trip routing & POI markers
 */

class VoyAgentMap {
  constructor(containerId) {
    this.containerId = containerId;
    this.map = null;
    this.markersGroup = null;
    this.routePolyline = null;
    this.currentPins = [];
  }

  init() {
    if (this.map) return;

    const container = document.getElementById(this.containerId);
    if (!container) return;

    // Center on Kyoto by default
    this.map = L.map(this.containerId, {
      zoomControl: false
    }).setView([35.0116, 135.7681], 13);

    // Modern standard OpenStreetMap tiles (no API key watermark)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(this.map);

    // Zoom control at bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(this.map);

    this.markersGroup = L.featureGroup().addTo(this.map);
  }

  renderDayRoute(slots, dayNumber = 1) {
    if (!this.map) this.init();
    if (!this.markersGroup) return;

    this.markersGroup.clearLayers();
    if (this.routePolyline) {
      this.map.removeLayer(this.routePolyline);
      this.routePolyline = null;
    }

    const latLngs = [];

    slots.forEach((slot, index) => {
      if (!slot.coords) return;
      const [lat, lng] = slot.coords;
      latLngs.push([lat, lng]);

      // Custom HTML Pin with number
      const customIcon = L.divIcon({
        className: 'custom-pin-wrapper',
        html: `
          <div class="custom-map-marker ${slot.replanned ? 'replanned-marker' : ''}" id="map-pin-${slot.id}">
            <span class="marker-number">${index + 1}</span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      const marker = L.marker([lat, lng], { icon: customIcon });

      const popupHtml = `
        <div class="map-popup-inner">
          <div class="popup-tag">${slot.category}</div>
          <div class="popup-title">${slot.title}</div>
          <div class="popup-time" style="font-size: 0.75rem; color: #64748b; font-family: monospace;">⏰ ${slot.time}</div>
          <div class="popup-cost">💰 ${slot.cost}</div>
        </div>
      `;

      marker.bindPopup(popupHtml);
      this.markersGroup.addLayer(marker);
    });

    // Draw route line between POIs
    if (latLngs.length > 1) {
      this.routePolyline = L.polyline(latLngs, {
        color: '#0284C7',
        weight: 4,
        opacity: 0.85,
        dashArray: '8, 8',
        lineCap: 'round'
      }).addTo(this.map);
    }

    // Auto fit bounds to show all markers
    if (latLngs.length > 0) {
      this.map.fitBounds(this.markersGroup.getBounds().pad(0.18), {
        animate: true,
        duration: 0.8
      });
    }

    // Invalidate map size in case container resized
    setTimeout(() => {
      if (this.map) this.map.invalidateSize();
    }, 200);
  }

  focusSlot(slotId, coords) {
    if (!this.map || !coords) return;
    this.map.flyTo(coords, 15, { duration: 1.2 });
  }
}

window.VoyAgentMap = VoyAgentMap;
