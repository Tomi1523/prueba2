import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPropertiesById } from "../api/Api";
import { Listing } from "../interfaces/types";

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertiesById(id!);
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleGoBack = () => {
    navigate("/menu");
  };

  if (isLoading) {
    return (
      <div className="text-center my-4">
        <div className="spinner-border text-danger" role="status"></div>
      </div>
    );
  }

  if (!property) {
    return <div>Propiedad no encontrada</div>;
  }

  return (
    <div className="container">
      <div className="card mt-5 w-100">
        <div className="row">
          <div className="col-md-4 d-flex">
            <img
              src={property.images[0]}
              className="img-fluid rounded-start custom-img"
              alt={property.title}
            />
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

                  <p className="card-text">
                    <i className="bi bi-calendar-date-fill me-2"></i>{" "}
                    <strong>Fecha de publicación:</strong>{" "}
                    {new Date(property.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="card-text">
                    <i className="bi bi-bar-chart-fill me-2"></i>{" "}
                    <strong>Estado:</strong> for {property.status}
                  </p>
                  <p className="card-text">
                    <i className="bi bi-check-circle-fill me-2"></i>{" "}
                    <strong>Disponibilidad:</strong>{" "}
                    {property.isActive ? "Active" : "Inactive"}
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

              <button
                className="btn btn-warning mt-2"
                onClick={() => navigate(`/properties/edit/${property.id}`)}
              >
                <i className="bi bi-pencil-fill me-2"></i> Editar
              </button>
              <button className="btn btn-secondary mt-2" onClick={handleGoBack}>
                <i className="bi bi-arrow-left me-2"></i> Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
