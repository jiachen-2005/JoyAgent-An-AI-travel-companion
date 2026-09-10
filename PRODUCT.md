# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vanilla HTML5 / Modern CSS3 / ES Modules (Zero-build native web stack with Leaflet.js interactive maps)

## Users

- **Primary Audience**: Independent leisure travellers, couples, and friends seeking personalized, hassle-free multi-day trip itineraries with rich cultural and culinary depth.
- **Secondary Audience**: Families needing relaxed-pace schedules with child-friendly stops, and business travellers looking for time-efficient city day extensions.
- **User Job**: Collapse hours of fragmented research across search engines, booking sites, blogs, and weather apps into a single conversational session, and handle real-world disruptions (rain, transit delays) dynamically on the go.

## Product Purpose

VoyAgent is an intelligent, agentic travel companion that transforms travel preferences into structured, day-by-day itineraries and keeps them useful throughout the trip with real-time tool grounding (weather, maps, places, budget) and dynamic in-trip replanning.

## Positioning

Unlike static travel planners (e.g. Wanderlog, TripIt) that require manual edits when plans go awry, and unlike generic text-only LLMs that hallucinate distances and closed venues, VoyAgent combines a **Single AI Agent with Tool Calling Architecture** to ground its recommendations in real-time weather and routing data, providing one-click adaptive replanning when conditions change.

## Operating Context

- **Academic Context**: Coursework capstone for Monash University FIT3161 / FIT3162 Final Year Project (Group PCS-19).
- **Environment**: Desktop and tablet web interface for pre-trip planning and exploration, with responsive layouts adaptable to on-trip mobile use.
- **Evaluation Criteria**: Tool-calling accuracy (target >= 85%), replanning success rate (target >= 80%), and usability testing satisfaction (target >= 4/5 across 15+ participants).

## Capabilities and Constraints

- **Confirmed Capabilities**:
  - Conversational AI planning with transparent, step-by-step tool execution feedback.
  - Structured multi-day itineraries broken into Morning, Afternoon, and Evening slots with duration, cost, and tags.
  - Inter-activity transit legs (walking, subway, tram, bus, driving) with estimated durations.
  - Synchronized Leaflet.js OpenStreetMap interactive map with numbered pins and route polylines.
  - Dynamic replanning engine: detects environmental disruptions (e.g. sudden afternoon rainstorm) and replaces outdoor stops with sheltered cultural venues without breaking the surrounding schedule.
  - Budget Guard: progress tracking and visual category cost breakdown (Accommodation, Dining, Transport, Activities, Shopping).
  - Persona switching and Markdown export.
- **Confirmed Constraints**:
  - Out of scope per FYP specification: No direct booking transactions, payment processing, visa/passport services, travel insurance purchasing, or offline tile caching.
  - External API dependencies: Weather forecasts, place search data, and routing matrices.

## Brand Commitments

- **Name**: VoyAgent — Your Personal AI Travel Companion.
- **Tone of Voice**: Helpful, inspiring, adventurous, authoritative yet warm, and technically transparent.
- **Visual Identity**: Warm golden amber (`#F59E0B`) and sky navigation blue (`#0284C7`), paired with modern slate neutrals, glassmorphic floating elements, and dark/light mode support.

## Evidence on Hand

- Mid-term Presentation: `Document/White and Yellow Playful Illustration Travel Plans Presentation.pdf`.
- Project specification and team roles: `README.md`.
- Working Web UI prototype on Git branch `feat/fe-agent-ui`.
- Monash University Coursework Guidelines: `guide file/git-guide.html`.

## Product Principles

1. **One Cohesive Flow Over Tab Fragmentation**: Collapse maps, weather forecasts, place recommendations, and budget into one unified conversational workspace.
2. **Transparent Tool Intelligence**: Expose the agent's reasoning and external tool calls so travellers understand and trust how recommendations were calculated.
3. **Adaptive Resilience Over Fragile Schedules**: Travel plans are living blueprints; unexpected rain, delays, or closures must trigger seamless local replacements without discarding the rest of the trip.
4. **Zero Friction & High Performance**: Lightweight, dependency-free frontend that loads instantly and works consistently across modern browsers.

## Accessibility & Inclusion

- Light and Dark mode parity with contrast compliance (>= 4.5:1 for body text).
- Keyboard accessibility on all interactive controls (buttons, tabs, chat prompt inputs).
- Distinct visual badges and semantic color indicators for replanned or weather-alerted activities.
