import React from "react";

const ActiveFiltersTabs = ({ filters }) => {
  return (
    <div className="active-filters me-2">
      Active filters:{" "}
      {Object.keys(filters).map((property, key) => {
        if (filters[property] === "") {
          return;
        }
        return (
          <span
            key={key}
            className="badge bg-primary me-2"
          >{`${property}: ${filters[property]}`}</span>
        );
      })}
    </div>
  );
};

export default ActiveFiltersTabs;
