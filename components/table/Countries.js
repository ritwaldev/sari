import { useState, useEffect } from "react";

const Countries = ({ title, type, api, value, handleFilters }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/api/countries");

      const data = await response.json();

      setCountries(data);
    }

    fetchData();
  }, []);

  return (
    <>
      <label className="form-label">{title}</label>
      <select
        defaultValue={value}
        className="form-select"
        name={title.toLowerCase()}
        onChange={handleFilters}
      >
        <option value={value}>{value}</option>

        {countries.length > 1 &&
          countries.map((country, key) => {
            return (
              <option key={key} value={country.alpha3Code}>
                {country.name}
              </option>
            );
          })}
      </select>
    </>
  );
};

export default Countries;
