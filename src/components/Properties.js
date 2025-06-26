import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { authHeader } from './authheader';


const Properties = () => {
  const [properties, setProperties] = useState([]);

  
  useEffect(() => {
  const userId = localStorage.getItem("userId");
  console.log(userId);

  if (!userId) {
    console.error("User ID not found in localStorage",userId);
    return;
  }

  axios.get(`http://localhost:8081/api/user/${userId}/Property`)
    .then(response => {
      console.log("hello");
      console.log("Data fetched:", response.data);
      setProperties(response.data);
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}, []);

  
 const deleteProperty = (id) => {
    axios.delete(`http://localhost:8081/api/Property/${id}`)
      .then(() => {
        // Remove from frontend state
        setProperties(properties.filter(property => property.id !== id));
      })
      .catch(error => console.error('Error deleting property:', error));
  };

  return (
    
    <Container className="my-4">
      
      <h2 className="mb-4">Available Properties</h2>
      <Row>
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          properties.map((property) => (
           
            <Col md="4" key={property.id} className="mb-4">
              <Card>
                <CardBody>
                  <CardTitle tag="h5">{property.type}</CardTitle>
                  <CardText>📍 Address: {property.address}</CardText>
                  <CardText>💰 Price: ₹{property.price}</CardText>
                  <Button color="primary">View Details</Button>
<Button color="danger" className='ms-2' onClick={() => deleteProperty(property.id)}>Delete</Button>
                </CardBody>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Properties;
