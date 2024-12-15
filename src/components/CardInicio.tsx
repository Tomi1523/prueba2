import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import argentinaFlag from "../assets/bandera.png";
import colombiaFlag from "../assets/colombia.png";
import mexicoFlag from "../assets/mexico.png";
import puertoRicoFlag from "../assets/puertorico.png";
import uaeFlag from "../assets/emiratosarabes.png";

import logoanimated from "../assets/logoanimated.gif";

const flags = {
  argentina: { label: "Argentina", value: "argentina", flag: argentinaFlag },
  colombia: { label: "Colombia", value: "colombia", flag: colombiaFlag },
  mexico: { label: "México", value: "mexico", flag: mexicoFlag },
  puertoRico: {
    label: "Puerto Rico",
    value: "puertoRico",
    flag: puertoRicoFlag,
  },
  uae: { label: "Emiratos Árabes Unidos", value: "uae", flag: uaeFlag },
};

const CardInicio: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const GoInicio = () => {
    navigate("/menu");
    setIsModalOpen(false);
  };

  const customStyles = {
    option: (provided: any) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      color: "rgb(23, 23, 23)",
      fontSize: "15px",
      width: "220px",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      width: "260px",
      color: "rgb(23, 23, 23)",
      fontSize: "15px",
    }),
  };

  const languageStyles = {
    option: (provided: any) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      width: "139px",
      color: "rgb(23, 23, 23)",
      fontSize: "15px",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      width: "90px",
      color: "rgb(23, 23, 23)",
      fontSize: "15px",
    }),
  };

  const flagOptions = Object.values(flags).map((flag) => ({
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={flag.flag}
          alt={`${flag.label} Flag`}
          style={{ height: "20px", marginRight: "5px", width: "30px" }}
        />
        {flag.label}
      </div>
    ),
    value: flag.value,
  }));

  const languageOptions = [
    { label: "English", value: "english" },
    { label: "Español", value: "spanish" },
  ];

  return (
    <div className="container-fluid">
      {isModalOpen && (
        <div
          className="modal modal-fade show"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="d-flex justify-content-center align-items-center">
                <div className="card card-inicio w-100">
                  <div className="card-header card-header-inicio d-flex justify-content-start">
                    <div className="row ">
                      <div className="col-6 col-md-6">
                        <Select
                          options={flagOptions}
                          defaultValue={flagOptions[0]}
                          styles={customStyles}
                          isSearchable={false}
                          className="select-flag"
                        />
                      </div>
                      <div className="col-6 col-md-4">
                        <Select
                          options={languageOptions}
                          defaultValue={languageOptions[0]}
                          styles={languageStyles}
                          isSearchable={false}
                          className="select-language"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="card-body text-center">
                    <div className="row g-0">
                      <div className="col-12">
                        <img
                          src={logo}
                          alt="logo"
                          className="logo-inicio img-fluid"
                        />
                      </div>
                      <div className="col-12">
                        <h3 className="title-inicio">Know Your Property</h3>
                      </div>

                      <button className="col-12 button-disabled" disabled>
                        Plataform comming soon
                      </button>

                      <div className="col-12">
                        <p className="terms-conditions">
                          By entering the platform, I agree to the{" "}
                          <span>Terms and Conditions</span>
                        </p>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-12 col-md-6 mb-2 mb-md-0">
                        <button
                          className="btn-inicio btn btn-primary w-100"
                          onClick={GoInicio}
                        >
                         
                          Ir al menu
                        </button>
                      </div>
                      <div className="col-12 col-md-6 mt-2 mt-md-0">
                        <button
                          className="btn-inicio btn btn-primary w-100"
                          onClick={GoInicio}
                        >
                          <img
                            src={logoanimated}
                            className="img-logo"
                            alt="Atlas Prof"
                          />{" "}
                          Ir al menu
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardInicio;
