import React from "react";

const FilterButton = ({ filter, setFilter }) => {
  return (
    <div className="filter">
      <button onClick={() => setFilter(!filter)}>
        {filter ? "Show All" : "Hide Completed"}
      </button>
    </div>
  );
};

export default FilterButton;
