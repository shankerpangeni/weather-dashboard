import React, { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [tempkelvin, setTempkelvin] = useState(0);
  const [weatherstatus, setWeatherstatus] = useState("");
  const [namecity, setNamecity] = useState("");
  const [tempcelcius, setTempcelsius] = useState(0);
  const [tempfarhenheit, setTempfarhenheit] = useState(0);
  const [country, setCountry] = useState("");
  const [humidity, setHumidity] = useState(0); // added humidity state
  const [isCelsius, setIsCelsius] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  // Capitalize words
  const capitalizeWords = (str) =>
    str
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const fetchdata = async (selectedcity = city) => {
    const API_KEY = "b284ba8db20aabef33ff61084d714009";
    const Apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedcity}&appid=${API_KEY}`;

    try {
      const response = await fetch(Apiurl);

      if (response.status === 404) {
        throw new Error("City does not exist");
      }

      const data = await response.json();
      const tempkelvin = data.main.temp;
      const tempC = (tempkelvin - 273.15).toFixed(0);
      const tempF = (((tempkelvin - 273.15) * 9) / 5 + 32).toFixed(0);
      const weatherstatus = capitalizeWords(data.weather[0].description);
      const namecity = data.name;
      const country = data.sys.country;
      const humidity = data.main.humidity; // fetch humidity from API

      setError("");
      setHasSearched(true);
      setTempkelvin(tempkelvin);
      setWeatherstatus(weatherstatus);
      setNamecity(namecity);
      setTempcelsius(tempC);
      setTempfarhenheit(tempF);
      setCountry(country);
      setHumidity(humidity); // set humidity
    } catch (err) {
      setError(err.message);
      setHasSearched(false);
      setShowErrorAlert(true);

      setTimeout(() => {
        setShowErrorAlert(false);
      }, 3000);

      setWeatherstatus("");
      setTempcelsius(0);
      setTempfarhenheit(0);
      setNamecity("");
      setCountry("");
      setHumidity(0); // reset humidity
    }
  };

  const getWeatherImage = (status) => {
    if (!status) return "/images/clear.png";
    const s = status.toLowerCase();
    if (s.includes("clear")) return "/images/clear.png";
    if (s.includes("cloud")) return "/images/clouds.png";
    if (s.includes("rain")) return "/images/rain.png";
    if (s.includes("snow")) return "/images/snow.png";
    if (s.includes("mist")) return "/images/mist.png";
    if (s.includes("drizzle")) return "/images/drizzle.png";
    if (s.includes("thunderstorm")) return "/images/thunderstorm.png";
    return "/images/default.png";
  };

  const toggleTemp = () => setIsCelsius((prev) => !prev);

  const getTemperature = () =>
    isCelsius ? `${tempcelcius}°C` : `${tempfarhenheit}°F`;

  return (
    <div className="relative flex justify-center min-h-screen bg-[linear-gradient(135deg,#00feba,#5b548a)] p-4">
      {/* Error Alert */}
      {showErrorAlert && (
        <div className="absolute top-4 left-1/2 max-w-xl md:max-w-2xl lg:max-w-3xl transform -translate-x-1/2 bg-red-500 text-white px-8 py-2 rounded-lg flex items-center justify-between gap-2 shadow-lg text-lg md:text-xl font-medium">
          <span>{error}</span>
          <button
            onClick={() => setShowErrorAlert(false)}
            className="text-xl font-bold cursor-pointer"
          >
            ✖
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4 w-full max-w-xl md:max-w-2xl lg:max-w-3xl items-center py-10 px-6 md:px-8 rounded-[10px] text-white">
        <h1 className="font-bold text-2xl md:text-4xl text-center">
          Weather Dashboard
        </h1>

        {/* Input & Search */}
        <div className="flex flex-row gap-2 w-full items-center">
          <input
            type="text"
            placeholder="Enter the city name"
            className="flex-1 min-w-0 px-4 py-3 text-lg md:text-xl text-black bg-gray-200 rounded-l-3xl border-2 border-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={() => fetchdata(city)}
            className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full hover:scale-110 transition-transform duration-200 shadow-lg border-2 border-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
              />
            </svg>
          </button>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-lg md:text-xl font-medium">{error}</p>}

        {/* Weather Info */}
        {hasSearched && (
          <div className="flex flex-col items-center mt-4 gap-4">
            <img
              src={getWeatherImage(weatherstatus)}
              alt="weather"
              className="w-32 h-32 md:w-40 md:h-40"
            />
            <p className="text-xl md:text-3xl">{weatherstatus}</p>

            {/* Temperature */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mt-2">
              <span className="font-bold text-4xl md:text-6xl">{getTemperature()}</span>
              <button
                onClick={toggleTemp}
                className="px-4 py-2 text-lg md:text-2xl rounded-2xl bg-white text-black hover:bg-gray-200 hover:cursor-pointer"
              >
                In {isCelsius ? "Fahrenheit" : "Celsius"}
              </button>
            </div>

            {/* Humidity */}
            <div className="flex items-center gap-2 mt-2">
              <img src="/images/humidity.png" alt="humidity" className="w-8 h-8 md:w-10 md:h-10" />
              <span className="text-lg md:text-2xl">{humidity}% Humidity</span>
            </div>

            <p className="text-lg md:text-2xl mt-2">
              {namecity}, {country}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
