import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Listing } from "../interfaces/types";
import { getProperties } from "../api/Api";
import PropertyMap from "./PropertyMap";
import SearchBar from "./SearchBar";
import SortButtons from "./SortButtons";

const GetProperties = () => {
  const [allProperties, setAllProperties] = useState<Listing[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Listing | null>(
    null
  );
  const [hasMorePages, setHasMorePages] = useState<boolean>(true);
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const data = await getProperties(currentPage, ITEMS_PER_PAGE);
        setAllProperties(data);

        if (data.length < ITEMS_PER_PAGE) {
          setHasMorePages(false);
        } else {
          setHasMorePages(true);
        }
      } catch (error) {
        console.error("Error al obtener propiedades:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [currentPage]);

  const handleNextPage = () => {
    if (hasMorePages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSort = (order: "asc" | "desc") => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handleShowDetails = (property: Listing) => {
    navigate(`/properties/${property.id}`);
  };

  const handleEdit = (property: Listing) => {
    navigate(`/properties/edit/${property.id}/`);
  };

  const handleShowMap = (property: Listing) => {
    setSelectedProperty(property);
  };

  const handleCloseMap = () => {
    setSelectedProperty(null);
  };

  const sortedProperties = useMemo(() => {
    return [...allProperties].sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });
  }, [allProperties, sortOrder]);

  const filteredProperties = sortedProperties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const highlightSearchTerm = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  if (isLoading) {
    return (
      <div className="text-center my-4">
        <div className="spinner-border text-danger" role="status"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <SortButtons onSort={handleSort} />
      <div className="d-flex flex-column justify-content-around">
        {filteredProperties.length === 0 ? (
          <div className="text-center my-4">
            <p className="text-danger">
              No se encontraron resultados para la búsqueda.
            </p>
          </div>
        ) : (
          filteredProperties.map((property) => (
            <div className="card mt-3 w-100" key={property.id}>
              <div className="row">
                <div className="col-md-4 d-flex">
                  <img
                    src={property.images[0]}
                    className="img-fluid rounded-start"
                    alt={property.title}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                      <i className="bi bi-house-fill me-2"></i>
                      {highlightSearchTerm(property.title, searchTerm)}
                    </h5>
                    <div className="row">
                      <div className="col-md-6">
                        <p className="card-text">
                          <i className="bi bi-geo-alt-fill me-2"></i>{" "}
                          <strong>Dirección:</strong>{" "}
                          {highlightSearchTerm(property.address, searchTerm)}
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
                          <i className="bi bi-calendar-date-fill me-2"></i>{" "}
                          <strong>Fecha de publicación:</strong>{" "}
                          {new Date(property.createdAt).toLocaleDateString()}
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
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-6">
                        <button
                          className="btn btn-primary  w-100"
                          onClick={() => handleShowDetails(property)}
                        >
                          <i className="bi bi-info-circle-fill me-2"></i>{" "}
                          <span>Más info </span>
                        </button>
                      </div>
                      <div className="col-6">
                        <button
                          className="btn btn-success w-100"
                          onClick={() => handleShowMap(property)}
                        >
                          <i className="bi bi-geo-alt-fill me-2"></i>
                          <span> Ubicacíon</span>
                        </button>
                      </div>
                    </div>
                    <button
                      className="btn btn-warning mt-2"
                      onClick={() => handleEdit(property)}
                    >
                      <i className="bi bi-pencil-fill me-2"></i>
                      <span> Editar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="pagination-controls d-flex justify-content-center gap-3 mt-4 mb-4">
        <button
          className="btn btn-secondary"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <i className="bi bi-arrow-left"></i>
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleNextPage}
          disabled={!hasMorePages}
        >
          <i className="bi bi-arrow-right"></i>
        </button>
      </div>
      {selectedProperty && (
        <div className="modal d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"> {selectedProperty.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleCloseMap}
                ></button>
              </div>
              <div className="modal-body">
                <PropertyMap
                  center={[
                    selectedProperty.location.lat,
                    selectedProperty.location.lng,
                  ]}
                  zoom={13}
                  address={selectedProperty.address}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetProperties;
