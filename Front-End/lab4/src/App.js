import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"
import ProductDetails from "./ProductDetail";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
import TableComponent from "./product-list";
axios.defaults.baseURL= process.env.REACT_APP_API_URL_BACKEND
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TableComponent />} />
        <Route path="/product" element={<ProductForm />} />
        <Route path="/detail/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
