import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  ListGroup,
  Form,
  Button,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviewText, setReviewText] = useState("");
  useEffect(() => {
    axios
      .get(`/products/${id}`)
      .then((response) => {
        setProduct(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [id]);
  const handleReviewSubmit = () => {
    if (reviewText.length > 0) {
      axios
        .post(`/products/${id}/comment`, {
          text: reviewText,
        })
        .then((response) => {
          setProduct(response.data.data);
          setReviewText("");
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    }
  };
  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              {product.images.map((image, index) => (
                <Image
                  key={index}
                  src={`${process.env.REACT_APP_API_URL_BACKEND}/${image.url}`}
                  alt={`Image ${index}`}
                  fluid
                  style={{ marginBottom: '10px' }}
                />
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>Price: ${product.price}</Card.Text>
              <Card.Text>Category: {product.category.name}</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Comments</Card.Title>
              <ListGroup>
                {product.comment.map((comment, index) => (
                  <ListGroup.Item key={index}>{comment.text}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Add Review</Card.Title>
              <Form>
                <Form.Group controlId="reviewText">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleReviewSubmit}>
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
