import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import GetProperties from "./components/GetProperties";
import EditPropierties from "./components/EditPropierties";
import AddProperties from "./components/AddProperties";
import PropertyDetails from "./components/PropertyDetails";
import "./App.css";
import CardInicio from "./components/CardInicio";

function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route path="/menu" element={<GetProperties />} />
        <Route path="/properties/edit/:id/" element={<EditPropierties />} />
        <Route path="/properties" element={<AddProperties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/" element={<CardInicio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
