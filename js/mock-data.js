/**
 * VoyAgent Mock Data
 * FIT3161 - Personal AI Travel Companion
 */

window.VOYAGENT_DATA = {
  // Preset Trips
  trips: {
    kyoto: {
      id: "kyoto",
      title: "Kyoto Autumn Cultural Odyssey",
      destination: "Kyoto, Japan",
      duration: "4 Days / 3 Nights",
      budget: {
        total: "¥180,000",
        allocated: "¥142,500",
        currency: "JPY",
        percentUsed: 79,
        breakdown: [
          { category: "Accommodation", amount: "¥68,000", share: "48%", icon: "🏨" },
          { category: "Dining & Cafes", amount: "¥38,500", share: "27%", icon: "🍜" },
          { category: "Transport & IC", amount: "¥14,000", share: "10%", icon: "🚆" },
          { category: "Temples & Activities", amount: "¥16,000", share: "11%", icon: "⛩️" },
          { category: "Shopping & Tea", amount: "¥6,000", share: "4%", icon: "🛍️" }
        ]
      },
      tags: ["Solo/Couple", "Cultural Heritage", "Moderate Pace", "Foodie Focus"],
      weatherForecast: [
        { day: "Day 1 (Thu)", temp: "18°C / 10°C", condition: "Sunny", icon: "☀️", rain: "0%", alert: false },
        { day: "Day 2 (Fri)", temp: "15°C / 11°C", condition: "Heavy Rain (PM)", icon: "🌧️", rain: "85%", alert: true, alertText: "Heavy rain 14:00-18:00 (18mm)" },
        { day: "Day 3 (Sat)", temp: "19°C / 12°C", condition: "Partly Cloudy", icon: "⛅", rain: "10%", alert: false },
        { day: "Day 4 (Sun)", temp: "21°C / 13°C", condition: "Clear Sky", icon: "☀️", rain: "5%", alert: false }
      ],
      days: [
        {
          dayNumber: 1,
          dateTitle: "Day 1: Historic Higashiyama & Gion Nightfall",
          slots: [
            {
              id: "k1",
              time: "09:30 - 12:00",
              title: "Kiyomizu-dera & Wooden Terrace",
              category: "⛩️ Temple / Culture",
              desc: "Explore the UNESCO World Heritage temple famous for its wooden stage offering panoramic Kyoto vistas and sacred Otowa Waterfall.",
              location: "Higashiyama Ward, Kyoto",
              coords: [34.9949, 135.7850],
              rating: "4.8 (12.4k)",
              cost: "¥400 entrance",
              transitNext: { mode: "walk", info: "🚶 8 min walk down historic stone slopes (600m)" }
            },
            {
              id: "k2",
              time: "12:15 - 14:30",
              title: "Sannenzaka & Ninenzaka Traditional Teahouses",
              category: "🍵 Gastronomy & Tea",
              desc: "Stroll preserved Edo-period stone-paved streets, enjoy warm matcha parfaits and artisanal Kyoto soba noodles.",
              location: "Sannenzaka, Higashiyama",
              coords: [34.9984, 135.7806],
              rating: "4.7 (8.9k)",
              cost: "¥1,800 lunch",
              transitNext: { mode: "walk", info: "🚶 12 min scenic stroll through Maruyama Park (900m)" }
            },
            {
              id: "k3",
              time: "15:00 - 17:30",
              title: "Yasaka Shrine & Maruyama Park",
              category: "⛩️ Historic Landmark",
              desc: "Visit the vibrant vermilion gate of Gion's spiritual heart, famous for hanging paper lanterns and tranquil autumn gardens.",
              location: "Gionmachi Kitagawa, Higashiyama",
              coords: [35.0037, 135.7785],
              rating: "4.6 (9.5k)",
              cost: "Free entrance",
              transitNext: { mode: "walk", info: "🚶 6 min walk across Shijo Dori (450m)" }
            },
            {
              id: "k4",
              time: "18:00 - 20:30",
              title: "Gion Shirakawa & Pontocho Alley Dinner",
              category: "🌙 Nightlife & Dining",
              desc: "Atmospheric evening stroll alongside the canal with willow trees, followed by traditional Kyoto Kaiseki dinner overlooking the Kamogawa River.",
              location: "Pontocho, Nakagyo Ward",
              coords: [35.0062, 135.7712],
              rating: "4.9 (5.3k)",
              cost: "¥5,500 dinner"
            }
          ]
        },
        {
          dayNumber: 2,
          dateTitle: "Day 2: Arashiyama & Mountain Heritage",
          // Original state before replanning
          slots: [
            {
              id: "k5",
              time: "08:30 - 11:00",
              title: "Arashiyama Bamboo Grove & Tenryu-ji",
              category: "🌿 Nature & Zen",
              desc: "Morning walk through towering emerald bamboo stalks, visiting Tenryu-ji's legendary 14th-century Zen garden.",
              location: "Ukyo Ward, Kyoto",
              coords: [35.0170, 135.6713],
              rating: "4.8 (21k)",
              cost: "¥500 temple fee",
              transitNext: { mode: "walk", info: "🚶 15 min walk across Togetsukyo Bridge (1.1km)" }
            },
            {
              id: "k6",
              time: "11:30 - 13:30",
              title: "Togetsukyo Bridge & Riverside Soba Lunch",
              category: "🍜 Lunch & Scenery",
              desc: "Enjoy traditional handmade soba alongside the picturesque Katsura River with views of autumn hillsides.",
              location: "Arashiyama, Ukyo Ward",
              coords: [35.0128, 135.6777],
              rating: "4.6 (4.2k)",
              cost: "¥2,200",
              transitNext: { mode: "walk", info: "🚶 10 min walk to mountain hiking path" }
            },
            {
              id: "k7",
              time: "14:00 - 16:30",
              title: "Iwatayama Monkey Park (Outdoor Mountain Hike)",
              category: "🐒 Outdoor Activity",
              desc: "Hike up the open hill trail to observe wild Japanese macaques and enjoy Kyoto skyline views.",
              location: "Arashiyama Iwatayama",
              coords: [35.0102, 135.6763],
              rating: "4.5 (3.8k)",
              cost: "¥600",
              isVulnerableToRain: true,
              transitNext: { mode: "bus", info: "🚌 Kyoto Bus #11 to Kinkaku-ji (35 min)" }
            },
            {
              id: "k8",
              time: "17:00 - 19:30",
              title: "Kinkaku-ji (Golden Pavilion) Sunset",
              category: "✨ Iconic Landmark",
              desc: "Marvel at the top two floors covered in gold leaf reflecting across Mirror Pond.",
              location: "Kita Ward, Kyoto",
              coords: [35.0394, 135.7292],
              rating: "4.7 (19k)",
              cost: "¥500"
            }
          ]
        },
        {
          dayNumber: 3,
          dateTitle: "Day 3: Fushimi Inari & Uji Green Tea Legacy",
          slots: [
            {
              id: "k9",
              time: "07:30 - 10:30",
              title: "Fushimi Inari Taisha 1,000 Torii Path",
              category: "⛩️ Sacred Shrine",
              desc: "Early morning hike through thousands of vibrant vermilion gates winding up the sacred Mount Inari.",
              location: "Fushimi Ward, Kyoto",
              coords: [34.9671, 135.7727],
              rating: "4.9 (35k)",
              cost: "Free entrance",
              transitNext: { mode: "train", info: "🚆 JR Nara Line to Uji Station (22 min)" }
            },
            {
              id: "k10",
              time: "11:15 - 14:00",
              title: "Byodoin Phoenix Hall & Uji River Crossing",
              category: "🏯 National Treasure",
              desc: "The iconic Pure Land Buddhist temple depicted on Japan's 10-yen coin, surrounded by tranquil lotus ponds.",
              location: "Uji, Kyoto Prefecture",
              coords: [34.8893, 135.8078],
              rating: "4.8 (8.1k)",
              cost: "¥600",
              transitNext: { mode: "walk", info: "🚶 5 min to Uji Omotesando (300m)" }
            },
            {
              id: "k11",
              time: "14:15 - 16:45",
              title: "Tsuen Authentic Matcha Grinding Workshop",
              category: "🍵 Heritage Experience",
              desc: "Hands-on tea master workshop grinding Uji Gyokuro matcha in an 860-year-old tea shop.",
              location: "Uji Bridge East, Uji",
              coords: [34.8926, 135.8115],
              rating: "4.8 (1.9k)",
              cost: "¥3,500 workshop"
            }
          ]
        },
        {
          dayNumber: 4,
          dateTitle: "Day 4: Shogun Fortresses & Departure",
          slots: [
            {
              id: "k12",
              time: "09:00 - 11:30",
              title: "Nijo Castle & Nightingale Security Floors",
              category: "🏯 Feudal Palace",
              desc: "Explore Tokugawa Shogunate residence famous for squeaking 'nightingale' wooden alarm floors and Ninomaru Palace murals.",
              location: "Nakagyo Ward, Kyoto",
              coords: [35.0142, 135.7482],
              rating: "4.7 (14k)",
              cost: "¥1,300 with palace",
              transitNext: { mode: "subway", info: "🚇 Tozai Subway Line to Kyoto Station (15 min)" }
            },
            {
              id: "k13",
              time: "12:00 - 14:30",
              title: "Kyoto Station Skyway & Souvenir Hall",
              category: "🛍️ Departure & Bento",
              desc: "Pick up authentic Yatsuhashi pastries and artisan crafts before boarding the Shinkansen.",
              location: "Shimogyo Ward, Kyoto",
              coords: [34.9858, 135.7588],
              rating: "4.5 (18k)",
              cost: "¥3,000 shopping"
            }
          ]
        }
      ]
    },

    melbourne: {
      id: "melbourne",
      title: "Melbourne Laneways & Coastal Odyssey",
      destination: "Melbourne & Great Ocean Road, Australia",
      duration: "3 Days / 2 Nights",
      budget: {
        total: "A$1,200",
        allocated: "A$940",
        currency: "AUD",
        percentUsed: 78,
        breakdown: [
          { category: "Rental Car & Fuel", amount: "A$280", share: "30%", icon: "🚗" },
          { category: "Boutique Lodging", amount: "A$390", share: "41%", icon: "🏨" },
          { category: "Specialty Dining", amount: "A$180", share: "19%", icon: "☕" },
          { category: "Wildlife Sanctuary", amount: "A$90", share: "10%", icon: "🐨" }
        ]
      },
      tags: ["Weekend Getaway", "Scenic Coastal Drive", "Specialty Coffee", "Active Wildlife"],
      weatherForecast: [
        { day: "Day 1 (Sat)", temp: "22°C / 14°C", condition: "Sunny & Mild", icon: "☀️", rain: "5%", alert: false },
        { day: "Day 2 (Sun)", temp: "19°C / 13°C", condition: "Coastal Breeze", icon: "⛅", rain: "15%", alert: false },
        { day: "Day 3 (Mon)", temp: "24°C / 15°C", condition: "Clear Sky", icon: "☀️", rain: "0%", alert: false }
      ],
      days: [
        {
          dayNumber: 1,
          dateTitle: "Day 1: Cultural Laneways & Culinary Heart",
          slots: [
            {
              id: "m1",
              time: "09:00 - 11:30",
              title: "Flinders Street & Degraves Street Coffee Crawl",
              category: "☕ Specialty Coffee",
              desc: "Begin at Melbourne's iconic copper-domed station, weaving into laneways renowned for world-class flat whites.",
              location: "Melbourne CBD",
              coords: [-37.8180, 144.9671],
              rating: "4.7 (9.2k)",
              cost: "A$18",
              transitNext: { mode: "walk", info: "🚶 5 min to Hosier Lane (350m)" }
            },
            {
              id: "m2",
              time: "11:45 - 13:30",
              title: "Hosier Lane Street Art & ACMI Gallery",
              category: "🎨 Arts & Media",
              desc: "Experience ever-evolving graffiti murals and Australia's national museum of screen culture at Fed Square.",
              location: "Federation Square",
              coords: [-37.8163, 144.9691],
              rating: "4.8 (11k)",
              cost: "Free entrance",
              transitNext: { mode: "tram", info: "🚋 Tram Route 19 to Queen Victoria Market (12 min)" }
            },
            {
              id: "m3",
              time: "14:00 - 16:30",
              title: "Queen Victoria Market Artisan Delis",
              category: "🧀 Gourmet Market",
              desc: "Historic 1878 marketplace filled with fresh Tasmanian oysters, artisan cheeses, and hot jam donuts.",
              location: "Queen St, Melbourne",
              coords: [-37.8076, 144.9568],
              rating: "4.6 (24k)",
              cost: "A$35 tasting"
            }
          ]
        },
        {
          dayNumber: 2,
          dateTitle: "Day 2: Great Ocean Road & Twelve Apostles",
          slots: [
            {
              id: "m4",
              time: "08:00 - 11:00",
              title: "Torquay Surf Beach & Memorial Arch Drive",
              category: "🌊 Coastal Road",
              desc: "Pick up the coastal highway, stopping at the birthplace of Rip Curl and the historic WWI Memorial Archway.",
              location: "Eastern View, Victoria",
              coords: [-38.4500, 144.0000],
              rating: "4.8 (7k)",
              cost: "A$45 petrol share",
              transitNext: { mode: "drive", info: "🚗 1h 20m scenic coastal twists to Apollo Bay" }
            },
            {
              id: "m5",
              time: "12:30 - 14:00",
              title: "Apollo Bay Fishermen's Seafood Lunch",
              category: "🦞 Fresh Catch",
              desc: "Dine on southern rock lobster rolls overlooking the calm ocean harbour.",
              location: "Apollo Bay, VIC",
              coords: [-38.7567, 143.6667],
              rating: "4.6 (3.2k)",
              cost: "A$42",
              transitNext: { mode: "drive", info: "🚗 1h 15m inland rainforest drive through Great Otway" }
            },
            {
              id: "m6",
              time: "16:00 - 18:30",
              title: "Twelve Apostles & Loch Ard Gorge Sunset",
              category: "🌅 Natural Wonder",
              desc: "Spectacular golden hour light illuminating dramatic limestone stacks rising 45 meters above the Southern Ocean.",
              location: "Port Campbell National Park",
              coords: [-38.6658, 143.1047],
              rating: "4.9 (29k)",
              cost: "Free entrance"
            }
          ]
        }
      ]
    }
  },

  // Dynamic Replanning Event: Kyoto Day 2 Afternoon Rainstorm
  replannedKyotoDay2: {
    event: "Heavy Rainstorm & Thunderstorms (85% prob at 14:00, 18mm rainfall)",
    agentReasoning: [
      "⚠️ Weather Alert detected via WeatherAPI: Arashiyama outdoor elevation and hiking trails (Monkey Park) are dangerous and muddy under heavy rain.",
      "🔍 Querying Google Places API for indoor cultural attractions within 25 min transit radius.",
      "💡 Replaced outdoor hike with Kyoto National Museum (indoor Heian art collection) + sheltered Nishiki Market foodie arcade.",
      "🗺️ Updated routing via Keifuku Electric Railway & Subway Tozai line. Transit time: 24 minutes."
    ],
    toolCalls: [
      { name: "WeatherAPI.get_hourly_forecast", args: "location='Kyoto', hour=14", status: "🌧️ 18mm rain, wind 28km/h" },
      { name: "PlacesAPI.search_indoor_pois", args: "type='museum|covered_market', rating>=4.6", status: "Found: Kyoto National Museum, Nishiki Market" },
      { name: "TransitRoutingAPI.compute_route", args: "from='Arashiyama' to='Kyoto National Museum'", status: "24m via Keifuku Randen & Tozai Line" }
    ],
    newSlots: [
      {
        id: "k5",
        time: "08:30 - 11:00",
        title: "Arashiyama Bamboo Grove & Tenryu-ji",
        category: "🌿 Nature & Zen",
        desc: "Morning walk through towering emerald bamboo stalks, visiting Tenryu-ji's legendary 14th-century Zen garden.",
        location: "Ukyo Ward, Kyoto",
        coords: [35.0170, 135.6713],
        rating: "4.8 (21k)",
        cost: "¥500 temple fee",
        transitNext: { mode: "walk", info: "🚶 15 min walk across Togetsukyo Bridge (1.1km)" }
      },
      {
        id: "k6",
        time: "11:30 - 13:30",
        title: "Togetsukyo Bridge & Riverside Soba Lunch",
        category: "🍜 Lunch & Scenery",
        desc: "Enjoy traditional handmade soba alongside the picturesque Katsura River with views of autumn hillsides.",
        location: "Arashiyama, Ukyo Ward",
        coords: [35.0128, 135.6777],
        rating: "4.6 (4.2k)",
        cost: "¥2,200",
        transitNext: { mode: "train", info: "🚆 Randen Tram to Shijo-Omiya & Metro (24 min sheltered)" }
      },
      {
        id: "k7_replanned",
        time: "14:15 - 16:45",
        title: "Kyoto National Museum (Indoor Masterpieces)",
        category: "🏛️ Sheltered Museum",
        desc: "✨ [REPLANNED FOR RAIN] Admire historic Buddhist sculptures, exquisite samurai armor and Japanese calligraphy in the dry, climate-controlled Meiji pavilion.",
        location: "Higashiyama Ward, Kyoto",
        coords: [34.9902, 135.7728],
        rating: "4.7 (7.2k)",
        cost: "¥700",
        replanned: true,
        originalTitle: "Iwatayama Monkey Park",
        transitNext: { mode: "walk", info: "🚶 12 min covered walk to Nishiki Arcade (850m)" }
      },
      {
        id: "k8_replanned",
        time: "17:00 - 19:30",
        title: "Nishiki Market 'Kyoto's Kitchen' Covered Arcade",
        category: "🥢 Sheltered Foodie Haven",
        desc: "✨ [REPLANNED FOR RAIN] A 400-year-old 5-block covered shopping street completely protected from weather. Sample fresh grilled eel, dashi tamago, and artisanal wagashi.",
        location: "Nakagyo Ward, Kyoto",
        coords: [35.0050, 135.7652],
        rating: "4.7 (16k)",
        cost: "¥3,500 food crawl",
        replanned: true,
        originalTitle: "Kinkaku-ji Golden Pavilion"
      }
    ]
  }
};
