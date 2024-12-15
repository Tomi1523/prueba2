import React from "react";
import { AddedPropertyCardProps } from "../interfaces/types";

const AddedPropertyCard: React.FC<AddedPropertyCardProps> = ({ property }) => {
  return (
    <div className="container mb-5">
      <div className="card mt-5 w-100">
        <div className="row">
          <div className="col-md-4 d-flex">
            {property.images && property.images.length > 0 ? (
              <img
                src={property.images[0]}
                className="img-fluid rounded-start custom-img"
                alt={property.title}
              />
            ) : (
              <div className="d-flex align-items-center justify-content-center w-100 h-100 bg-light text-muted">
                Sin imagen
              </div>
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">
                <i className="bi bi-house-fill me-2"></i>
                {property.title}
              </h5>
              <div className="row">
                <div className="col-md-6">
                  <p className="card-text">
                    <i className="bi bi-geo-alt-fill me-2"></i>{" "}
                    <strong>Dirección:</strong> {property.address}
                  </p>
                  <p className="card-text">
                    <i className="bi bi-building me-2"></i>{" "}
                    <strong>Tipo:</strong> {property.type}
                  </p>
                  <p className="card-text">
                    <i className="bi bi-cash-stack me-2"></i>{" "}
                    <strong>Precio:</strong> ${property.price} USD
                  </p>
                  <p className="card-text">
                    <i className="bi bi-person-fill me-2"></i>{" "}
                    <strong>Nombre:</strong> {property.owner.name}
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="card-text">
                    <i className="bi bi-bar-chart-fill me-2"></i>{" "}
                    <strong>Estado:</strong> {property.status}
                  </p>
                  <p className="card-text">
                    <i className="bi bi-check-circle-fill me-2"></i>{" "}
                    <strong>Disponibilidad:</strong>{" "}
                    {property.isActive ? "Si" : "No"}
                  </p>
                  <p className="card-text">
                    <i className="bi bi-aspect-ratio me-2"></i>{" "}
                    <strong>Área:</strong> {property.area} m²
                  </p>
                  <p className="card-text">
                    <i className="bi bi-envelope-fill me-2"></i>{" "}
                    <strong>Contacto:</strong> {property.owner.contact}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="card-text">
                    <i className="bi bi-file-earmark-text me-2"></i>{" "}
                    <strong>Descripción:</strong> {property.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddedPropertyCard;
