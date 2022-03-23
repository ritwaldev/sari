import { useState, useEffect, useRef, useContext } from "react";

import Countries from "./Countries";

import { herosContext } from "./Table";

const HerosFilterForm = ({
  handleFormHeight,
  handleFilters,
  filters,
  handleResetFilters,
}) => {
  const [formConfig, setFormConfig] = useState([]);

  const herosFilterForm = useRef();

  const countrySelectRef = useRef();

  const heros = useContext(herosContext);

  useEffect(() => {
    if (heros.length !== 0) {
      async function fetchConfig() {
        const requiredInputs = Object.keys(heros[0]);

        const requiredInputsParams = requiredInputs.join("&");

        const response = await fetch(
          process.env.NEXT_PUBLIC_SITE_URL +
            "/api/filter-config?" +
            requiredInputsParams
        );
        const config = await response.json();

        setFormConfig(config);

        // Get height of filter form
        updateFromHeight();
      }

      async function runFetchConfig() {
        try {
          await fetchConfig();
        } catch (e) {
          console.error(e);
        }
      }
      runFetchConfig();
    }
  }, [heros]);

  function updateFromHeight() {
    const height = herosFilterForm.current.offsetHeight;

    handleFormHeight(height);
  }

  // Add event listener for screen size and adjust filter form height accordingly
  useEffect(() => {
    window.addEventListener("resize", updateFromHeight);
    return () => window.removeEventListener("resize", updateFromHeight);
  }, []);

  return (
    <form ref={herosFilterForm} className="pt-5">
      <div className="row g-3 mb-3">
        {formConfig.map((field, key) => {
          return (
            <div className="col-lg-4 col-6" key={key}>
              {(field.type === "text" || field.type === "date") && (
                <>
                  <label className="form-label">{field.title}</label>
                  <input
                    className="form-control"
                    type={field.type}
                    name={field.title.toLowerCase()}
                    value={filters[field.title.toLowerCase()]}
                    aria-label={field.title}
                    onChange={handleFilters}
                  />
                </>
              )}
              {field.type === "dropdown" && (
                <Countries
                  countrySelectRef={countrySelectRef}
                  title={field.title}
                  api={field.api}
                  handleFilters={handleFilters}
                  filters={filters}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="reset-filter text-end">
        <button
          className="btn btn-danger"
          onClick={(e) => {
            handleResetFilters(e, countrySelectRef);
          }}
        >
          Reset filters
        </button>
      </div>
    </form>
  );
};

export default HerosFilterForm;
