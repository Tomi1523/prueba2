import React from "react";
import { SortButtonsProps } from "../interfaces/types";

const SortButtons: React.FC<SortButtonsProps> = ({ onSort }) => {
  return (
    <div className="row">
      <div className="col-12 d-flex justify-content-center align-items-center mb-3">
        <div className="col-12 col-sm-6 d-flex justify-content-center">
          <button
            className="btn btn-primary btn-custom me-2 d-flex align-items-center"
            onClick={() => onSort("asc")}
          >
            <i className="bi bi-arrow-up me-1"></i>
            Precio (Asc)
          </button>
          <button
            className="btn btn-primary btn-custom d-flex align-items-center"
            onClick={() => onSort("desc")}
          >
            <i className="bi bi-arrow-down me-1"></i>
            Precio (Desc)
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortButtons;
