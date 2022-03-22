import { useState, useEffect, useRef } from "react";

import Countries from "./Countries";

const HerosFilterForm = ({
  handleFormHeight,
  handleFilters,
  filters,
  /* handleFilterFormSubmit, */
  handleResetFilters,
}) => {
  const [formConfig, setFormConfig] = useState([]);

  const herosFilterForm = useRef();

  useEffect(() => {
    async function fetchConfig() {
      const response = await fetch("/api/filter-config");
      const config = await response.json();

      setFormConfig(config);

      // get height of drop filter
      updateFromHeight();
    }
    fetchConfig();
  }, []);

  function updateFromHeight() {
    // get height of dropdown filter
    const height = herosFilterForm.current.offsetHeight;

    handleFormHeight(height);
  }

  useEffect(() => {
    window.addEventListener("resize", updateFromHeight);
    return () => window.removeEventListener("resize", updateFromHeight);
  }, []);

  return (
    <form
      ref={herosFilterForm}
      className="pt-5"
      /*  onSubmit={handleFilterFormSubmit} */
    >
      <div className="row g-3 mb-3">
        {formConfig.length > 1 &&
          formConfig.map((field, key) => {
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
                    title={field.title}
                    type={field.type}
                    api={field.api}
                    value={filters[field.title]}
                    handleFilters={handleFilters}
                  />
                )}
              </div>
            );
          })}
      </div>
      {/* <div className="submit-filter text-end">
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </div> */}

      <div className="reset-filter text-end">
        <button className="btn btn-danger" onClick={handleResetFilters}>
          Reset filters
        </button>
      </div>
    </form>
  );
};

export default HerosFilterForm;
