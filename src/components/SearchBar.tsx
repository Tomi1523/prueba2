import React from "react";
import { SearchBarProps } from "../interfaces/types";

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  return (
    <div className="my-3 position-relative">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar por título o dirección"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
      {searchTerm && (
        <button
          type="button"
          className="btn-close position-absolute end-0 top-50 translate-middle-y me-2"
          aria-label="Close"
          onClick={() => onSearch("")}
        ></button>
      )}
    </div>
  );
};

export default SearchBar;
