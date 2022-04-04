import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import WeatherApp from "./WeatherApp";
import "./assets/images/clouds.png";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <WeatherApp />
  </React.StrictMode>
);
