# ☕ The Incredible Coffee Machine Dashboard Challenge

Welcome to your little coding challenge. Don't take it too serious. We want to meet your working style. 🚀

Meet **Brew the Barista Bot** - he's been crafting the perfect cup since 2022, and now he needs YOUR help to build his dream dashboard. This is a delightful 1–2 hour adventure where you'll create a web interface that makes coffee data as smooth as a perfectly pulled espresso shot.

## 🌟 Your Mission

Transform boring coffee machine data into a delightful, interactive dashboard that would make even the grumpiest Monday morning person smile. Think of it as **"Netflix for Coffee Data"** - but with more caffeine and better charts!

## 🏗️ What's Already Brewing

- **Mock Coffee API**: A json-server that knows everything about our beloved coffee machine
- **Next.js 14 + Marmelab React-Admin**: The foundation is laid, like a perfect coffee bed
- **Docker Magic**: One command to rule them all (`docker compose up --build`)
- **Brew's Data**: Real-time status + historical brewing wisdom served hot brewed by the API

## 🚀 Quick Start

1. Clone/fork this repository
2. Fire it up: `docker compose up --build` (if you don't have Docker, install it: https://docs.docker.com/get-docker/)
3. Visit your coffee kingdom: http://localhost:5000
4. Peek at the API magic: http://localhost:5001
5. Start building something amazing!
6. Have fun - seriously, this should be enjoyable! 😊

## 🎯 Your Challenge Checklist

Build a insightful Dashboard showing the coffee machine's current state and trends.

- Use `/status` for current state (cups, temp, strength, pH, color, creator)
- Use `/history` for time series (avgTempC, avgStrength, cupsServed, avgPH, wasteWaterColor)
- Use the methods of the given framework
- you can import new bundles if you need them (see Appendix)
- Create a pleasant dashboard showing status and historical data 
  - You can display it in a clean, funny, crazy, strict or "whatever way you want" style 
- Commit your work in meaningful small commits to git, add tags if parts of work are finished
- There is a place for commenting on your work in README under "Applicant Notes"

**Must-Haves (The Coffee Basics):**
- [ ] Fetch and display current machine status
- [ ] Show historical brewing trends
 
**Nice-To-Haves (The Coffee Taste):**

Still some time left? Maybe you are adventurous and want to try: 
- Create ONE clever computed metric (surprise us!)
- Add ONE delightful visual element (make us smile!)
- Include ONE interactive feature (let users play!)

- if you have a good idea, you can extend the mock data with more fields, e.g. `brewTime` (see `server/db.json`)

**We're looking for**
- **Functionality**: Does it work? Can we see coffee data, current state and historical?
- **Code Quality**: Clean, readable, and well-organized
- **User Experience**: Would Brew be proud to show this off?
- **Development Process**: Meaningful commits that tell a story

**Tips**
- **Keep scope tight** finish a simple, clear dashboard over many half‑done ideas
- **Timebox** leave short notes on what you'd do with more time

Remember: There's no single "right" answer here. We want to see YOUR personality shine through the code. Show us how you think, how you solve problems, and how you can make data delightful.

# 📜 Applicant Notes

here is space for your documentation, comments, follow-ups, questions, etc.

---
# Appendix

## Installing new dependencies

- `docker compose exec client sh`
- `npm install <package-name>`
- `exit`

## 📡 API Coffee Can

You'll find the API under: http://localhost:5001

**Current Status** (`GET /status`):

Example response:

```json
{
  "id": 1,
  "cupsLeft": 7,
  "temperatureC": 68.4,
  "strength": 0.78,
  "waterPH": 6.8,
  "waterColor": "#4B2E2B",
  "creator": "Brew the Barista Bot",
  "lastBrewStartedAt": "2025-09-17T13:45:00.000Z",
  "lastBrewFinishedAt": "2025-09-17T13:52:00.000Z",
  "updatedAt": "2025-09-17T13:55:00.000Z"
}
```


**Historical Wisdom** (`GET /history`):
Arrays of brewing adventures with
```json
[
  {
    "id": 1,
    "timestamp": "2025-09-17T14:00:00.000Z",
    "cupsServed": 5,
    "avgTempC": 67.2,
    "avgStrength": 0.75,
    "avgPH": 6.9,
    "wasteWaterColor": "#8B4513"
  },
  {
    "id": 2,
    "timestamp": "2025-09-17T13:30:00.000Z",
    "cupsServed": 3,
    "avgTempC": 68.1,
    "avgStrength": 0.82,
    "avgPH": 6.7,
    "wasteWaterColor": "#654321"
  },
  ...
]

```


## 🛠️ Local Development without docker

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
