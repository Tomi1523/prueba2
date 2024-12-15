import React, {
  useState,
  useRef,
  ChangeEvent,
  FormEvent,
  useEffect,
} from "react";
import { v4 as uuidv4 } from "uuid";
import PropertyMap from "./PropertyMap";
import { Listing, AddressDetails, ValidationErrors } from "../interfaces/types";
import { addProperties, searchAddress } from "../api/Api";
import AddedPropertyCard from "./AddedPropertyCard";

const AddProperties: React.FC = () => {
  const initialPropertyState: Listing = {
    id: uuidv4(),
    address: "",
    title: "",
    description: "",
    location: {
      lat: 0,
      lng: 0,
    },
    images: [],
    type: "",
    status: "venta",
    isActive: true,
    price: 0,
    area: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    owner: {
      name: "",
      contact: "",
    },
  };

  const initialAddressDetailsState: AddressDetails = {
    country: "",
    city: "",
    street: "",
    number: "",
  };

  const [newProperty, setNewProperty] = useState<Listing>(initialPropertyState);
  const [addedProperty, setAddedProperty] = useState<Listing | null>(null);
  const [addressDetails, setAddressDetails] = useState<AddressDetails>(
    initialAddressDetailsState
  );
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    -34.603722, -58.381592,
  ]);
  const [mapZoom, setMapZoom] = useState<number>(2);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadInitialData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    };

    loadInitialData();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewProperty((prevProperty) => ({
      ...prevProperty,
      [name]: name === "price" || name === "area" ? parseFloat(value) : value,
    }));
    validateField(name as keyof ValidationErrors, value);
  };

  const updateLatLng = async (fullAddress: string) => {
    try {
      const data = await searchAddress(fullAddress);
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setNewProperty((prevProperty) => ({
          ...prevProperty,
          location: {
            lat: parseFloat(lat),
            lng: parseFloat(lon),
          },
        }));
      } else {
        console.warn("Dirección no encontrada");
      }
    } catch (error) {
      console.error("Error al buscar la dirección:", error);
    }
  };

  const handleAddressChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setAddressDetails((prevDetails) => {
      const updatedDetails = {
        ...prevDetails,
        [name]: value,
      };

      const fullAddress = `${updatedDetails.street} ${updatedDetails.number}, ${updatedDetails.city}, ${updatedDetails.country}`;

      setNewProperty((prevProperty) => ({
        ...prevProperty,
        address: fullAddress,
      }));

      updateLatLng(fullAddress);

      return updatedDetails;
    });

    validateField(name as keyof ValidationErrors, value);
  };

  const handleSearchAddress = async () => {
    setIsSearching(true);
    const { country, city, street, number } = addressDetails;
    const fullAddress = `${street} ${number}, ${city}, ${country}`;

    try {
      const data = await searchAddress(fullAddress);
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setNewProperty((prevProperty) => ({
          ...prevProperty,
          location: {
            lat: parseFloat(lat),
            lng: parseFloat(lon),
          },
          address: fullAddress,
        }));
        setMapCenter([parseFloat(lat), parseFloat(lon)]);
        setMapZoom(20);
      } else {
        alert("Dirección no encontrada");
      }
    } catch (error) {
      console.error("Error al buscar la dirección:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleOwnerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProperty((prevProperty) => ({
      ...prevProperty,
      owner: {
        ...prevProperty.owner,
        [name === "ownerName" ? "name" : "contact"]: value,
      },
    }));
    validateField(name as keyof ValidationErrors, value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setNewProperty((prevProperty) => ({
        ...prevProperty,
        images: imageUrls,
      }));
    }
  };

  const handleIsActiveChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewProperty((prevProperty) => ({
      ...prevProperty,
      isActive: e.target.checked,
    }));
  };

  const validateField = (name: keyof ValidationErrors, value: string) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (value) {
        if (name === "title" && (value.length < 5 || value.length > 100)) {
          newErrors[name] = "El título debe tener entre 5 y 100 caracteres";
        } else if (
          (name === "price" || name === "area") &&
          parseFloat(value) <= 0
        ) {
          newErrors[name] = "Este campo debe ser un número positivo";
        } else {
          delete newErrors[name];
        }
      } else {
        newErrors[name] = "Este campo es requerido";
      }
      return newErrors;
    });
  };

  const validateForm = () => {
    const newErrors: ValidationErrors = {};
    if (
      !newProperty.title ||
      newProperty.title.length < 5 ||
      newProperty.title.length > 100
    ) {
      newErrors.title = "El título debe tener entre 5 y 100 caracteres";
    }
    if (!addressDetails.country)
      newErrors.country = "El campo país es requerido";
    if (!addressDetails.city) newErrors.city = "El campo país es requerido";
    if (!addressDetails.street)
      newErrors.street = "El campo calle es requerido";
    if (!addressDetails.number)
      newErrors.number = "El campo numero es requerido";
    if (!newProperty.type) newErrors.type = "El campo tipo es requerido";
    if (!newProperty.status) newErrors.status = "El campo estado es requerido";
    if (!newProperty.price || newProperty.price <= 0)
      newErrors.price = "Este campo debe ser un número positivo";
    if (!newProperty.area || newProperty.area <= 0)
      newErrors.area = "Este campo debe ser un número positivo";
    if (!newProperty.owner.name)
      newErrors.ownerName = "El campo nombre es requerido";
    if (!newProperty.owner.contact)
      newErrors.ownerContact = "El campo contacto es requerido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const addedProperty = await addProperties(newProperty);
      setAddedProperty(addedProperty);

      setNewProperty(initialPropertyState);
      setAddressDetails(initialAddressDetailsState);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error al agregar la propiedad:", error);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="horizontal-lines-container">
        <strong className="horizontal-line" />
        <h1 className="mb-4 text-center">Agregar propiedades</h1>
        <strong className="horizontal-line" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="row g-3 needs-validation"
        noValidate
      >
        <div className="col-md-12">
          <label className="form-label">Titulo</label>
          <input
            type="text"
            name="title"
            className={`form-control ${
              errors.title ? "is-invalid" : newProperty.title ? "is-valid" : ""
            }`}
            value={newProperty.title}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">{errors.title}</div>
        </div>
        <div className="col-md-4">
          <label className="form-label">Pais</label>
          <input
            type="text"
            name="country"
            className={`form-control ${
              errors.country
                ? "is-invalid"
                : addressDetails.country
                ? "is-valid"
                : ""
            }`}
            value={addressDetails.country}
            onChange={handleAddressChange}
            required
          />
          <div className="invalid-feedback">{errors.country}</div>
        </div>
        <div className="col-md-4">
          <label className="form-label">Ciudad</label>
          <input
            type="text"
            name="city"
            className={`form-control ${
              errors.city ? "is-invalid" : addressDetails.city ? "is-valid" : ""
            }`}
            value={addressDetails.city}
            onChange={handleAddressChange}
            required
          />
          <div className="invalid-feedback">{errors.city}</div>
        </div>
        <div className="col-md-2">
          <label className="form-label">Calle</label>
          <input
            type="text"
            name="street"
            className={`form-control ${
              errors.street
                ? "is-invalid"
                : addressDetails.street
                ? "is-valid"
                : ""
            }`}
            value={addressDetails.street}
            onChange={handleAddressChange}
            required
          />
          <div className="invalid-feedback">{errors.street}</div>
        </div>
        <div className="col-md-2">
          <label className="form-label">Numero</label>
          <input
            type="text"
            name="number"
            className={`form-control ${
              errors.number
                ? "is-invalid"
                : addressDetails.number
                ? "is-valid"
                : ""
            }`}
            value={addressDetails.number}
            onChange={handleAddressChange}
            required
          />
          <div className="invalid-feedback">{errors.number}</div>
        </div>
        <div className="col-md-4">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleSearchAddress}
            disabled={isSearching}
          >
            {isSearching ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              "Buscar Dirección"
            )}
          </button>
        </div>
        <PropertyMap
          center={mapCenter}
          zoom={mapZoom}
          address={newProperty.address}
        />
        <div className="col-md-12">
          <label className="form-label">Descripción</label>
          <textarea
            name="description"
            className="form-control"
            rows={3}
            value={newProperty.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="col-md-12">
          <label className="form-label">Imagen</label>
          <input
            type="file"
            name="images"
            className="form-control"
            multiple
            onChange={handleImageChange}
            ref={fileInputRef}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Tipo</label>
          <input
            type="text"
            name="type"
            className={`form-control ${
              errors.type ? "is-invalid" : newProperty.type ? "is-valid" : ""
            }`}
            value={newProperty.type}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">{errors.type}</div>
        </div>

        <div className="col-md-6">
          <label className="form-label">Estado</label>
          <select
            name="status"
            className={`form-select ${
              errors.status
                ? "is-invalid"
                : newProperty.status
                ? "is-valid"
                : ""
            }`}
            value={newProperty.status}
            onChange={handleInputChange}
            required
          >
            <option value="venta">Venta</option>
            <option value="alquiler">Alquiler</option>
          </select>
          <div className="invalid-feedback">{errors.status}</div>
        </div>
        <div className="col-md-6">
          <label className="form-label">Precio</label>
          <input
            type="number"
            name="price"
            className={`form-control ${
              errors.price ? "is-invalid" : newProperty.price ? "is-valid" : ""
            }`}
            value={newProperty.price}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">{errors.price}</div>
        </div>
        <div className="col-md-6">
          <label className="form-label">Area</label>
          <input
            type="number"
            name="area"
            className={`form-control ${
              errors.area ? "is-invalid" : newProperty.area ? "is-valid" : ""
            }`}
            value={newProperty.area}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">{errors.area}</div>
        </div>
        <div className="col-md-6">
          <label className="form-label">Nombre del dueño</label>
          <input
            type="text"
            name="ownerName"
            className={`form-control ${
              errors.ownerName
                ? "is-invalid"
                : newProperty.owner.name
                ? "is-valid"
                : ""
            }`}
            value={newProperty.owner.name}
            onChange={handleOwnerChange}
            required
          />
          <div className="invalid-feedback">{errors.ownerName}</div>
        </div>
        <div className="col-md-6">
          <label className="form-label">Contacto</label>
          <input
            type="email"
            name="ownerContact"
            className={`form-control ${
              errors.ownerContact
                ? "is-invalid"
                : newProperty.owner.contact
                ? "is-valid"
                : ""
            }`}
            value={newProperty.owner.contact}
            onChange={handleOwnerChange}
            required
          />
          <div className="invalid-feedback">{errors.ownerContact}</div>
        </div>

        <div className="col-12">
          <div className="form-check">
            <input
              type="checkbox"
              name="isActive"
              className={`form-check-input ${
                errors.isActive
                  ? "is-invalid"
                  : newProperty.isActive
                  ? "is-valid"
                  : ""
              }`}
              checked={newProperty.isActive}
              onChange={handleIsActiveChange}
              required
            />
            <label className="form-check-label">Is Active</label>
          </div>
        </div>
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary btn-custom">
            Agregar Propiedad
          </button>
        </div>
      </form>
      {addedProperty && (
        <div className="alert alert-success text-center mt-3">
          ¡Propiedad agregada correctamente!
        </div>
      )}

      {addedProperty && <AddedPropertyCard property={addedProperty} />}
    </div>
  );
};

export default AddProperties;
