# AI-Powered Travel Planning System

An AI travel planner that turns a few preferences into a real, day-by-day itinerary — then keeps it useful during the trip with weather-aware replanning, budget tracking, and group expense splitting.

**Monash University · FIT3161 / FIT3162 Final Year Project · 2026**

> **Status:** Planning and setup. Development begins in Week 7. Technical architecture, technology stack and repository layout are still being decided and will be documented here once confirmed.

---

## Overview

Planning a trip means juggling a dozen tabs: what to see, how long it takes, what it costs, whether it rains, and who paid for what. This system collapses that into one flow.

The user gives destination, dates, budget, travel type, interests and pace. The system generates a personalised day-by-day itinerary, then supports the trip as it happens — replanning around weather, tracking spending against a budget, holding booking details in one place, and settling shared costs for group travel.

```
Preferences → AI itinerary → Booking records → Budget tracking → Edits & replanning
```

---

## Platforms

The system is delivered in **two forms, both required**:

| Platform | Scope |
|---|---|
| **Web application** | Full-featured interface for desktop and tablet. Complete itinerary planning and management. Responsive across screen sizes. |
| **Mobile super app** | Mobile-optimised interface for use during the trip. Same core functionality as web, plus location-based features (nearby recommendations, on-trip assistance) and push notifications for booking updates and budget alerts. |

Both share one backend API, one database and one business logic layer. They are the same system presented in two forms, not two systems.

---

## Features

Priorities were agreed with our supervisor. Nothing below is implemented yet — this is the scope we are building to.

### P0 · Core

| Feature | Description |
|---|---|
| **Personalised trip planning** | Collect destination (country / state / city), travel dates and duration, approximate budget, number of travellers, travel type (solo, family, business, romantic, adventure), interests (food, sightseeing, shopping, culture, nature, nightlife), and preferred pace (relaxed, moderate, packed). Supports group trip planning. |
| **AI-generated itineraries** | Day-by-day plans generated through an LLM API, returned as structured data rather than plain text. Morning, afternoon and evening suggestions per day, each with estimated time and cost. |
| **Destination & activity recommendations** | Suggest cities, attractions, activities, restaurants and accommodation based on user preferences. |
| **Trip management** | User registration and profile, create and save trips, edit saved itineraries, multiple trips per user. |

### P1 · High

| Feature | Description |
|---|---|
| **Dynamic replanning** | Edit individual activities without regenerating the whole itinerary. Check weather, identify affected activities, and suggest alternatives that fit the user's interests, location and budget. |
| **Maps & transport** | Display destinations and routes on a map, distances between locations, transport suggestions (walking, public transport, driving), and estimated travel time between itinerary points. |
| **Budget support** | Cost estimates for activities, category-specific allocations (accommodation, transport, food, activities, shopping), currency conversion, alerts as the plan approaches the budget limit, spending tracked against plan, and a visual budget breakdown. |
| **AI travel assistant** | Natural-language conversation for planning questions, recommendations during and before the trip, and itinerary changes requested in chat. Supports multi-turn context. |
| **Booking information management** | Store hotel reservations, flight itineraries and activity bookings, including confirmation numbers, contact details and documents. Display all bookings in a unified itinerary view, and use them for budget tracking and route planning. |

### P2 · Medium

| Feature | Description |
|---|---|
| **Group finance manager** | Track shared expenses for group trips and calculate what each traveller owes. Supports equal, percentage and custom splits, expense categories, payment status, and a clear "who owes whom" summary — including bookings one person paid for on behalf of the group. |
| **Hidden attraction discovery** | Surface lesser-known destinations that real travellers recommend but that are not yet overexposed. Categorised by type (cafes, viewpoints, restaurants, hiking trails, local markets) and verified against places data for location and practical details. |
| **Nearby suggestions** | Events and activities near the user's current location during the trip. |
| **Travel support information** | Packing suggestions, emergency contacts, visa and entry requirements (informational only), and travel FAQ. |

### P3 · Nice to have

Trip sharing for group planning · advanced multi-language support

---

## Team

| Member | Role | Responsibilities |
|---|---|---|
| **Chen Jia** | Backend Developer · Project Lead | Backend architecture, database design, server development, project coordination |
| **Chan Eunice** | LLM Engineer | LLM integration, prompt engineering, AI agent logic, itinerary generation |
| **Tom Wong Ren Syuen** | API Developer | External API integration, data fetching, third-party service connections |
| **Ting Jing Hao** | Frontend Developer | Web and mobile UI, itinerary display, user interaction |
| **Hu Longxi** | Frontend Developer | Web and mobile UI, responsive design, component development |

## Development Workflow

One long-lived branch (`main`), plus short branches that merge back as soon as a feature is done.

```bash
git switch main && git pull
git switch -c feat/be-trip-crud
# work, commit
git push -u origin feat/be-trip-crud
# open a PR on GitHub → Squash and merge
```

Branch names follow `type/scope-description` — for example `feat/be-trip-crud`, `fix/web-date-picker`, `chore/infra-ci`.

Full conventions: Quick guide (中英对照): [`docs/git-guide.pdf`](docs/git-guide.pdf)

---

## Academic Notice

This repository is coursework for FIT3161 / FIT3162 at Monash University. It is not a production service. Payment processing, visa and passport applications, travel insurance purchasing, and human travel-agent services are not part of this project.