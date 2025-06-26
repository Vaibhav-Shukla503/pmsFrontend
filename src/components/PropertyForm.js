import React, { useState } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap';

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

    axios.post('http://localhost:8081/api/user/2/Property', property)
      .then(response => {
        alert("Property added successfully!");
        console.log(response.data);
        setProperty({ address: '', type: '', price: '', area: '' }); // reset form
      })
      .catch(error => {
        console.error('Error adding property:', error);
        alert("Failed to add property.");
      });
  };

  return (
    <Container className="my-5">
      <h2>Add Property</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input
            type="text"
            name="address"
            id="address"
            value={property.address}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="type">Type</Label>
          <Input
            type="text"
            name="type"
            id="type"
            value={property.type}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="price">Price (₹)</Label>
          <Input
            type="number"
            name="price"
            id="price"
            value={property.price}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="bathrooms">Bathrooms</Label>
          <Input
            type="number"
            name="bathrooms"
            id="bathrooms"
            value={property.bathrooms}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="bedroom">Bedrooms</Label>
          <Input
            type="number"
            name="bedrooms"
            id="bedrooms"
            value={property.bedrooms}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="squareArea">Area (sq.ft)</Label>
          <Input
            type="number"
            name="area"
            id="area"
            value={property.area}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <Button color="primary" type="submit">Submit Property</Button>
      </Form>
    </Container>
  );
};

export default PropertyForm;
