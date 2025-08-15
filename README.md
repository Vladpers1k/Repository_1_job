# Random User Weather App

Full-stack application to view and save random users with weather data.

## 📌 Tech Stack

- **Frontend:** React, TailwindCSS
- **Backend:** Nest.js
- **Architecture:** Monorepo (`apps/client` and `apps/server`)

## 🚀 Features

### Main Page (Users)

- Fetch random users from [Random User API](https://randomuser.me/api/)
- Display user cards with:
  - Name
  - Gender
  - Location (City, Country)
  - Email
  - Profile image
  - Weather (icon + current temperature, min, max)
- Buttons on each card:
  - **Save** – save user on the backend
  - **Load more users** – fetch additional users

### Saved Users Page (`/saved`)

- Display users saved on the backend
- Uses the same card component as the main page

## 🌐 External APIs

- **Users:** [https://randomuser.me/api/](https://randomuser.me/api/)
- **Weather:** [Open-Meteo API](https://open-meteo.com/en/docs)
- **Example request:** [https://api.open-meteo.com/v1/forecast?latitude=-19.7962&longitude=178.2180&current_weather=true&hourly=temperature_2m]

## 🛠 Backend Requirements

- REST API
- Store data in-memory or JSON file
- Structure: `controller` → `service`
- Basic data validation using `class-validator`, `zod` or `Joi`

## 🖥 Frontend Requirements

- React
- Styles with TailwindCSS
- Desktop responsiveness
- Clean, component-based code structure

## ✨ Bonus Points Implemented

- Weather updates automatically every 5 minutes
- Guards/middleware implemented on backend (e.g., duplication check)
- Users can be deleted from saved list
