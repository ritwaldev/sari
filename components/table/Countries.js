import { useState, useEffect } from "react";

const Countries = ({
  title,
  api,
  handleFilters,
  countrySelectRef,
  filters,
}) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(api);

      const data = await response.json();

      setCountries(data);
    }

    async function runFetchData() {
      try {
        await fetchData();
      } catch (e) {
        console.error(e);
      }
    }
    runFetchData();
  }, []);

  return (
    <>
      <label className="form-label">{title}</label>
      <select
        value={filters.country}
        ref={countrySelectRef}
        className="form-select"
        name={title.toLowerCase()}
        onChange={handleFilters}
      >
        <option value=""></option>

        {countries.map((country, key) => {
          return (
            // Should use country.alpha3Code as value instead, need to lift the countries state up to Table.js since alpha3Code isn't available there to filter heros based on it.
            <option key={key} value={country.name.toLowerCase()}>
              {country.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Countries;
