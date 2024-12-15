import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import logoSmall from "../assets/logoSmall.svg";

const Layout = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/menu">
          <img
            src={logo}
            alt="logo"
            className="navbar-logo d-none d-md-block"
          />
          <img src={logoSmall} alt="logo" className=" logosmall d-md-none" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto" id="ul_menu">
            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/menu">
                Menú
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/properties">
                Agregar Propiedad
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Layout;
