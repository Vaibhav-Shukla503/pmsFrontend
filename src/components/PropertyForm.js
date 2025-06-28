import React, { useState } from 'react';
import axios from 'axios';
import {
  Form, FormGroup, Label, Input, Button, Container, Card, CardBody, Row, Col
} from 'reactstrap';

const PropertyForm = () => {
  const [property, setProperty] = useState({
    address: '',
    type: '',
    price: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
  });

  const handleChange = (e) => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   const userId = localStorage.getItem("userId"); // get dynamic userId

axios.post(`http://localhost:8081/api/user/${userId}/Property`, property)


      .then(response => {
        alert("Property added successfully!");
        console.log(response.data);
        setProperty({ address: '', type: '', price: '', area: '', bedrooms: '', bathrooms: '' });
      })
      .catch(error => {
        console.error('Error adding property:', error);
        alert("Failed to add property.");
      });
  };

  return (
    <Container className="my-5">
      <Card className="shadow border-0">
        <CardBody>
          <h2 className="text-center mb-4">📝 Add New Property</h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="address"><i className="bi bi-geo-alt-fill me-2 text-danger"></i>Address</Label>
                  <Input
                    type="text"
                    name="address"
                    id="address"
                    value={property.address}
                    onChange={handleChange}
                    placeholder="Enter property address"
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="type"><i className="bi bi-building me-2 text-primary"></i>Property Type</Label>
                  <Input
                    type="text"
                    name="type"
                    id="type"
                    value={property.type}
                    onChange={handleChange}
                    placeholder="e.g. Apartment, Villa"
                    required
                  />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="price"><i className="bi bi-currency-rupee me-2 text-success"></i>Price (₹)</Label>
                  <Input
                    type="number"
                    name="price"
                    id="price"
                    value={property.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    required
                  />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="area"><i className="bi bi-aspect-ratio-fill me-2 text-info"></i>Area (sq.ft)</Label>
                  <Input
                    type="number"
                    name="area"
                    id="area"
                    value={property.area}
                    onChange={handleChange}
                    placeholder="e.g. 1200"
                    required
                  />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="bedrooms"><i className="bi bi-house-door-fill me-2 text-warning"></i>Bedrooms</Label>
                  <Input
                    type="number"
                    name="bedrooms"
                    id="bedrooms"
                    value={property.bedrooms}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="bathrooms"><i className="bi bi-droplet-half me-2 text-secondary"></i>Bathrooms</Label>
                  <Input
                    type="number"
                    name="bathrooms"
                    id="bathrooms"
                    value={property.bathrooms}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>

            <div className="text-center mt-4">
              <Button color="primary" size="lg">Submit Property</Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default PropertyForm;
