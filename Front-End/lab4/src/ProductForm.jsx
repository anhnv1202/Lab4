import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Dropdown,
  DropdownButton,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    category: "",
    categoryId: "",
    images: [],
    captions: [],
  });
  const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });
  const [shouldFetchCategories, setShouldFetchCategories] = useState(true);
  //done
  useEffect(() => {
    if (shouldFetchCategories) {
      axios
        .get(`/categories`)
        .then((response) => {
          console.log(response.data.data);
          setCategories(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });

      setShouldFetchCategories(false);
    }
  }, [shouldFetchCategories]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  //done
  const handleCategorySelect = (category, categoryId) => {
    setProduct({ ...product, category, categoryId });
  };
  //done
  const handleImageUpload = (e) => {
    const files = e.target.files;
    const newImages = [];
    const newCaptions = [];
  
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Lấy base64 dữ liệu hình ảnh sau khi tải lên
        const base64Image = event.target.result;
        newImages.push(base64Image);
        newCaptions.push('');
        // Kiểm tra xem đã tải lên đủ số ảnh
        if (newImages.length === files.length) {
          setProduct({
            ...product,
            images: [...product.images, ...newImages],
            captions: [...product.captions, ...newCaptions],
          });
        }
      };
      reader.readAsDataURL(files[i]);
    }
    };

  const handleRemoveImage = (index) => {
    const newImages = [...product.images];
  const newCaptions = [...product.captions];
  newImages.splice(index, 1);
  newCaptions.splice(index, 1);
  setProduct({ ...product, images: newImages, captions: newCaptions });
  };

  const handleSubmit = (e) => {
    console.log(product);

    if (
      !product.name ||
      !product.price ||
      product.images.length === 0 ||
      !product.categoryId
    ) {
      alert("Please input all information");
      return;
    }
    e.preventDefault();
    axios
      .post("/products", {
        name: product.name,
        price: product.price,
        images: product.images,
        category: product.categoryId,
        captions: product.captions
      })
      .then((response) => {
        console.log("Product added successfully", response.data);
        setProduct({
          name: "",
          price: "",
          images: [],
          captions: []
        });
        alert("Category added successfully");
        setShouldFetchCategories(true);
      })
      .catch((error) => {
        alert(error.response.data.error);
        console.error("Error adding category:", error);
      });
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };
  const handleAddCategory = (e) => {
    e.preventDefault();

    axios
      .post("/categories", categoryData)
      .then((response) => {
        console.log("Category added successfully", response.data);
        setCategoryData({
          name: "",
          description: "",
        });
        setShouldFetchCategories(true);
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });
  };
  const handleCaptionChange = (e, index) => {
    const newCaptions = [...product.captions];
    newCaptions[index] = e.target.value;
    setProduct({ ...product, captions: newCaptions });
  };
  console.log(product)
  return (
    <div>
      <Link to={"/"}>Home</Link>
      <h2>Create Product</h2>
      <div>
        <Row>
          <Col xs={12} sm={6}>
            <Form.Group controlId="categoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={categoryData.name}
                onChange={handleCategoryChange}
              />
            </Form.Group>
            <Form.Group controlId="categoryDescription">
              <Form.Label>Category Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={categoryData.description}
                onChange={handleCategoryChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={(e) => handleAddCategory(e)}
              style={{ marginTop: "10px" }}
            >
              Add Category
            </Button>
          </Col>
          <Col xs={12} sm={6}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <DropdownButton
                title={product.category || "Select Category"}
                id="category-dropdown"
              >
                {categories?.map((category, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() =>
                      handleCategorySelect(category.name, category._id)
                    }
                  >
                    {category.name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Form.Group>
            <Form.Group controlId="images">
              <Form.Label>Images</Form.Label>
              <Form.Control
                type="file"
                name="images"
                multiple
                onChange={handleImageUpload}
              />
              <div>
                {product.images.map((image, index) => (
                  <div key={index} className="image-container">
                    <Image src={image} alt={`Image ${index}`} width="100" />
                    <input
                      type="text"
                      placeholder="Caption"
                      value={product.captions[index]}
                      onChange={(e) => handleCaptionChange(e, index)}
                    />
                    <button onClick={() => handleRemoveImage(index)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </Form.Group>

            <Button
              variant="primary"
              onClick={handleSubmit}
              style={{ marginTop: "10px" }}
            >
              Create
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductForm;
