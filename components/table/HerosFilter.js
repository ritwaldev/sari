import { useState, useEffect } from "react";

import HerosFilterForm from "./HerosFilterForm";

const HerosFilter = () => {
  const [filterCollapsed, setFilterCollapsed] = useState(true);

  const [formHeight, setFormHeight] = useState(false);

  function handleCollapsingFilter() {
    setFilterCollapsed((prev) => !prev);
  }

  function handleFormHeight(height) {
    setFormHeight(height);
  }

  return (
    <div className="filter bg-light rounded-4 p-3 my-3">
      <div className="filter-header d-flex justify-content-between align-items-center">
        <div className="search">
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-primary me-3" type="submit">
              Search
            </button>
          </form>
        </div>

        <button
          className="btn d-flex align-items-center text-white bg-nb rounded-3"
          onClick={handleCollapsingFilter}
        >
          Filter
          <svg
            className="ms-3"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM3.5 5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zM5 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm2 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
          </svg>
        </button>
      </div>

      <div
        className={`heros-filter-form ${filterCollapsed ? "collapsed" : ""}`}
        style={{ height: formHeight }}
      >
        <HerosFilterForm handleFormHeight={handleFormHeight} />
      </div>
    </div>
  );
};

export default HerosFilter;
