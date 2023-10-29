import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Image, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './productList.css';

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`/products`)
      .then((response) => {
        console.log(response.data.data);
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  if (!products) {
    return <div>Loading...</div>;
  }
  return (
    <div className="product-list-container">
      {/* <Link to={'/product'} className="add-product-link">Add Product</Link>
      <Row>
        <Col>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{width:'20%'}}>Thumbnail</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id.$oid} >
              <td>
                <Image
                  src={`${process.env.REACT_APP_API_URL_BACKEND}/${product.images[0].url}`}
                  alt={product.name}
                  className="product-thumbnail"
                />
              </td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category.name}</td>
              <td>
                <Link to={`/detail/${product._id}`} className="view-product-link"><Button>View Product</Button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </Col>
      </Row> */}
      <table id="table"
  data-show-columns="true"
  data-search="true"
  data-show-toggle="true"
  data-pagination="true"
  data-url="json/data1.json"
  data-resizable="true">
  <thead>
    <tr>
      <th data-field="id" data-sortable="true">ID</th>
      <th data-field="name" data-sortable="true">Item Name</th>
      <th data-field="price" data-sortable="true">Item Price</th>
    </tr>
  </thead>
</table>
    </div>
  );
};

export default ProductTable;
