import { useState } from "react";

type LocationFormProps = {
  setSubmittedCity: Function;
};

const LocationForm = ({ setSubmittedCity }: LocationFormProps) => {
  const [cityName, setSubmittedCityName] = useState("");

  const handleSubmit = () => {
    setSubmittedCity(cityName);
  };

  const handleChange = (e: any) => {
    setSubmittedCityName(e.target.value);
  };

  return (
    <div className="location-form">
      <label>City Name:</label>
      <input
        onChange={(e) => handleChange(e)}
        id="cityName"
        placeholder="Enter City Name"
      ></input>
      <button onClick={() => handleSubmit()}>Search Weather</button>
    </div>
  );
};

export default LocationForm;