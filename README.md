# Weather Dashboard Web App

## Project Description
A responsive web application that allows users to search for current weather information worldwide. It fetches data from the OpenWeatherMap API and displays temperature (Celsius/Fahrenheit), weather condition, humidity. Invalid city names are handled gracefully with alerts.

## Features
- Search for weather by city name
- Displays:
  - Temperature in Celsius/Fahrenheit
  - Weather condition (Sunny, Rainy, Cloudy, etc.)
  - Weather icon (from OpenWeather API)
  - City and country
- Toggle between Celsius and Fahrenheit
- Error alerts for invalid city names (shown at top and below input)
- Responsive design for desktop and mobile

## Technologies Used
- **Frontend:** React.js
- **Styling:** Tailwind CSS
- **API:** OpenWeatherMap API
- **JavaScript:** ES6+

## Steps to Run the Project
1. Clone the repository:
   ```bash
   git clone <https://github.com/shankerpangeni/weather-dashboard>
   cd <weather-dashboard>

2. Install dependencies
   ````bash
       npm install
       npm install tailwindcss @tailwindcss/vite
       npm install react-router-dom

3. Run the Development Server
 ```bash
    npm run dev