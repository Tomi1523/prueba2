import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Listing } from "../interfaces/types";
import { getPropertiesById, updatePropierties } from "../api/Api";

const EditPropierties = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    const getListing = async () => {
      if (id) {
        try {
          const data = await getPropertiesById(id);
          setListing(data);
        } catch (error) {
          console.error("Error al obtener el listado:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    getListing();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setListing((prevListing) =>
      prevListing ? { ...prevListing, [name]: value } : null
    );
  };

  const handleSaveEdit = async () => {
    if (listing) {
      try {
        await updatePropierties(listing);
        setIsEdited(true);
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
      }
    }
  };

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

  return (
    <div className="container">
      {isEdited ? (
        <div className="d-flex flex-column align-items-center justify-content-center mt-5">
          <div className="alert alert-success p-4" role="alert">
            !Propiedad editada correctamente!
          </div>
          <button
            className="btn btn-primary mt-2 px-5 py-2"
            onClick={handleGoBack}
          >
            Volver al menú
          </button>
        </div>
      ) : listing ? (
        <form>
          <div className="mb-3">
            <label htmlFor="editTitle" className="form-label">
              Titulo
            </label>
            <input
              type="text"
              className="form-control"
              id="editTitle"
              name="title"
              value={listing.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="editAddress" className="form-label">
              Dirección
            </label>
            <input
              type="text"
              className="form-control"
              id="editAddress"
              name="address"
              value={listing.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="editPrice" className="form-label">
              Precio
            </label>
            <input
              type="number"
              className="form-control"
              id="editPrice"
              name="price"
              value={listing.price}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSaveEdit}
          >
            Guardar cambios
          </button>
        </form>
      ) : (
        <div>Propiedad no encontrada</div>
      )}
    </div>
  );
};

export default EditPropierties;
