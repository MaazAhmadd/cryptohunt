import React from "react";

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <input
        type="text"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};
