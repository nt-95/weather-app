import { useState } from "react";

type LocationFormProps = {
  setSubmittedCity: Function;
};

const LocationForm = ({ setSubmittedCity }: LocationFormProps) => {
  const [cityName, setSubmittedCityName] = useState("");

  const handleSubmit = () => {
    setSubmittedCity(cityName);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubmittedCityName(e.target.value);
  };

  return (
    <div className="weather-app__location-form location-form__container">
      <label className="location-form__label">City Name</label>
      <input
        className="location-form__input"
        onChange={(e) => handleChange(e)}
        placeholder="Enter City Name"
      ></input>
      <button className="location-form__button" onClick={() => handleSubmit()}>
        Search Weather
      </button>
    </div>
  );
};

export default LocationForm;
