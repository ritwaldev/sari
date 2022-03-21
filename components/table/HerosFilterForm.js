import { useState, useEffect, useRef } from "react";

const HerosFilterForm = ({ handleFormHeight }) => {
  const [formConfig, setFormConfig] = useState([]);

  const herosFilterForm = useRef();

  useEffect(() => {
    async function fetchConfig() {
      const response = await fetch("/api/filter-config");
      const config = await response.json();

      setFormConfig(config);

      // get height of drop filter
      const height = herosFilterForm.current.offsetHeight;

      handleFormHeight(height);
    }
    fetchConfig();
  }, []);

  return (
    <form ref={herosFilterForm} className="pt-5">
      <div className="row g-3 mb-3">
        {formConfig.length > 1 &&
          formConfig.map((field, key) => {
            return (
              <div className="col-lg-4 col-6" key={key}>
                {(field.type === "text" || field.type === "date") && (
                  <input
                    className="form-control"
                    type={field.type}
                    placeholder={field.title}
                    aria-label={field.title}
                  />
                )}
                {field.type === "dropdown" && (
                  <select className="form-select">
                    <option value="hi">hi</option>
                  </select>
                )}
              </div>
            );
          })}
      </div>
      <div className="submit-filter text-end">
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default HerosFilterForm;
