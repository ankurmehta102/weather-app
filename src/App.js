import React, { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");
  const [coldBg, setColdBg] = useState("");

  const api = {
    key: "471256361e4220ec0a8e0e99282e5458",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const search = async (evt) => {
    if (evt.key === "Enter") {
      let response = await fetch(
        `${api.base}weather?q=${query}&units=metric&appid=${api.key}`
      );

      response = await response.json();

      setWeather(response);
      setQuery("");
      if (response.main != undefined) {
        setColdBg(response.weather[0].main);
      }
    }
  };

  return (
    <div className={coldBg === "Clear" ? "app warm" : "app"}>
      <main>
        <div className="search-box">
          <input
            type="text"
            placeholder="search..."
            className="search-bar"
            value={query}
            onKeyPress={search}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
