# ☕ The Incredible Coffee Machine Dashboard Challenge

Welcome to your little coding challenge for getting a little idea of your working style! 🚀

Meet **Brew the Barista Bot** - he's been crafting the perfect cup since 2022, and now he needs YOUR help to build his dream dashboard. This is a delightful 1–2 hour adventure where you'll create a web interface that makes coffee data as smooth as a perfectly pulled espresso shot.

## 🎯 Your Mission (Should You Choose to Accept It)

Transform boring coffee machine data into a delightful, interactive dashboard that would make even the grumpiest Monday morning person smile. Think of it as **"Netflix for Coffee Data"** - but with more caffeine and better charts!

## 🏗️ What's Already Brewing

- **Mock Coffee API**: A json-server that knows everything about our beloved coffee machine
- **Next.js 14 + React-Admin**: The foundation is laid, like a perfect coffee bed
- **Docker Magic**: One command to rule them all (`docker compose up --build`)
- **Brew's Data**: Real-time status + historical brewing wisdom served hot brewed by the API

## 🚀 Quick Start (Docker - The Easy Button)

- if you don't have Docker, install it: https://docs.docker.com/get-docker/

1. Prerequisites: Docker + Docker Compose (your new best friends)
2. Fire it up: `docker compose up --build`
3. Visit your coffee kingdom: http://localhost:5000
4. Peek at the API magic: http://localhost:5001

## 🛠️ Local Development (For the Adventurous)

- just in case you don't want to use Docker, here's how to run it locally

**API Server (The Brain):**
- `cd server`
- `npm i -g json-server@0.17.4`
- `json-server --watch db.json --routes routes.json --host 0.0.0.0 --port 5001`

**Web App (The Beauty):**
- `cd client`
- `npm install`
- `NEXT_PUBLIC_API_URL=http://localhost:5001 npm run dev`
- Open your masterpiece: http://localhost:5000

## 🎪 The Fun Stuff - What You Can Build

### 📊 Current Status Dashboard Ideas
- **Coffee Cup Fuel Gauge**: Animated cup that fills/empties based on `cupsLeft`
- **Temperature Thermometer**: Maybe with a "too hot to handle" warning emoji? 🌡️
- **Strength-O-Meter**: Progress bar with coffee bean icons (☕☕☕☕☕)
- **pH Magic**: Color-coded indicator (acidic = 😤, perfect = 😍, basic = 🤢)
- **Brew's Mood**: Generate emoji based on machine performance

### 📈 Historical Trends (Time Travel for Coffee)
- **Coffee Consumption Heatmap**: "Wow, Wednesdays are WILD!"
- **Temperature Roller Coaster**: Line chart of brewing temps over time
- **Strength Journey**: "From mild Monday to MAXIMUM FRIDAY POWER!"
- **pH Balance Tracker**: The secret to the perfect brew
- **Color Palette Museum**: Visual history of water colors

### 🎮 Interactive Magic
- **°C/°F Temperature Toggle**: For our international coffee lovers
- **Time Machine Slider**: "Show me last 24 hours vs last week"
- **Metric Switcher**: Focus on temperature, strength, or pH trends
- **Coffee Mood Theme**: Change dashboard colors based on pH levels
- **Prediction Engine**: "When will we run out of coffee?" (CRITICAL ALERT! 🚨)

### 🎨 Playful Visual Ideas
- **Coffee Bean Rain**: Animated beans falling based on cups served
- **Brewing Timeline**: Visual story of each brew cycle
- **Color Gradient Magic**: Use actual water colors in your designs
- **Cup Collection**: Gallery of different cup styles based on strength
- **Barista Performance Score**: Rate Brew's brewing skills
- **Coffee Weather**: "Today's brew forecast: Strong with a chance of perfect"

## 📡 API Treasure Trove

**Current Status** (GET /status):

Example response:
- id: 1
- cupsLeft: 7
- temperatureC: 68.4
- strength: 0.78
- waterPH: 6.8
- waterColor: "#4B2E2B"
- creator: "Brew the Barista Bot"
- lastBrewStartedAt: "2025-09-17T13:45:00.000Z"
- lastBrewFinishedAt: "2025-09-17T13:52:00.000Z"
- updatedAt: "2025-09-17T13:55:00.000Z"

**Historical Wisdom** (GET /history):
Arrays of brewing adventures with `avgTempC`, `avgStrength`, `cupsServed`, `avgPH`, `wasteWaterColor`, and timestamps!

## 🎯 Your Challenge Checklist

**Must-Haves (The Coffee Basics):**
- [ ] Fetch and display current machine status
- [ ] Show historical brewing trends
- [ ] Create ONE clever computed metric (surprise us!)
- [ ] Add ONE delightful visual element (make us smile!)
- [ ] Include ONE interactive feature (let users play!)
- [ ] Keep it readable and document your creative choices

**Stretch Goals (The Espresso Shot):**
- [ ] Mini-charts that tell a story
- [ ] Coffee mood detection algorithm
- [ ] Interactive color legend
- [ ] Brewing efficiency calculator
- [ ] "Coffee emergency" notifications
- [ ] Brew's personality integration

## 🏆 Git Workflow (Your Development Story)
Tell your story in meaningful commits:
1. **Init**: "🚀 Coffee dashboard foundation ready"
2. **Fetch**: "📊 Real-time status and history connected"
3. **Compute**: "🧮 Added brewing efficiency calculator"
4. **Visual**: "🎨 Interactive coffee cup fuel gauge"
5. **Interact**: "🎮 Temperature unit toggle and time filters"
6. **Polish**: "✨ Final touches and documentation" + tag `v0.1`

## What's pre‑wired
- Next.js app hosting React‑Admin
    - Data Provider: ra-data-json-server pointed at the API URL
    - Resource: coffeeHistory with a basic list
    - Dashboard: a minimal, playful status widget reading from GET /status
- Docker Compose: api (5001) and web (5000)

## Applicant task (1–2 hours)
Build a fun, insightful Dashboard showing the coffee machine's current state and trends.

- Use /status for current state (cups, temp, strength, pH, color, creator)
- Use /history for time series (avgTempC, avgStrength, cupsServed, avgPH, wasteWaterColor)
- Add at least one computed metric (e.g., moving average strength, time‑to‑empty, temp trend)
- Add at least one playful visual (e.g., cup fill, gradients, emoji gauges, cup collage)
- Add one small interaction (e.g., °C/°F toggle, "last N entries", metric switch, pH theme)
- Keep it readable and explain briefly in README under "Applicant Notes"

### Stretch ideas (optional)
- Tiny chart of avgTempC or avgStrength
- Computed "coffee mood" emoji/mascot
- Color legend for water/coffee colors

## Configuration
- Web → API URL: NEXT_PUBLIC_API_URL (Docker uses http://api:5001)
- Local default API URL if not set: http://localhost:5001

## File structure
- /server
    - Dockerfile
    - db.json (mock data)
    - routes.json (custom endpoints mapping)
- /client (Next.js)
    - Dockerfile
    - next.config.js, next-env.d.ts, tsconfig.json
    - app/ (layout.tsx, page.tsx)
    - components/ (AdminApp.tsx, Dashboard.tsx)
- docker-compose.yml
- README.md

## ⚙️ Technical Setup
- **Next.js 14**: Modern React with all the bells and whistles
- **React-Admin**: Admin interface that doesn't suck
- **Material-UI**: Beautiful components out of the box
- **TypeScript**: Because we're professionals here
- **Docker**: One-command deployment magic

## 🎯 Success Metrics
We're looking for:
- **Functionality**: Does it work? Can we see coffee data?
- **Creativity**: Did you make us go "Ooh, that's clever!"?
- **Code Quality**: Clean, readable, and well-organized
- **User Experience**: Would Brew be proud to show this off?
- **Development Process**: Meaningful commits that tell a story

## Evaluation checklist
- Fetch and present both current and historical data
- Include and explain at least one derived metric
- Add a playful element without harming clarity
- Organized code and meaningful commits
- Easy to run via Docker or locally

## 💡 Pro Tips from Veteran Coffee Developers
- **Start small, think big**: Better to have one amazing feature than five half-baked ones
- **Embrace the coffee theme**: Have fun with the domain - it's about COFFEE! ☕
- **Time-box ruthlessly**: 2 hours max - leave notes about what you'd do next
- **Make Brew proud**: He's been working hard, show his data some love
- **Document your thinking**: A quick note about your approach goes a long way

## Tips
- Keep scope tight; finish a simple, clear dashboard over many half‑done ideas
- Timebox; leave short notes on what you'd do with more time

## 🚀 Ready to Begin?

1. Clone/fork this repository
2. Run `docker compose up --build`
3. Open http://localhost:5000
4. Start building something amazing!
5. Have fun - seriously, this should be enjoyable! 😊

Remember: There's no single "right" answer here. We want to see YOUR personality shine through the code. Show us how you think, how you solve problems, and how you can make data delightful.

**Now go forth and caffeinate some data! ☕✨**

---

*P.S. - If you build something that makes us laugh, smile, or go "wow" - you're already winning! 🏆*