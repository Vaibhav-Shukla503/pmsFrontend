import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { authHeader } from './authheader';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';





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


const [updateFormVisible, setUpdateFormVisible] = useState(false);
const [editingProperty, setEditingProperty] = useState(null);
const [updatedData, setUpdatedData] = useState({});
const UpdateProperty = (id) => {
  const propertyToEdit = properties.find(p => p.id === id);
  setEditingProperty(propertyToEdit);
  setUpdatedData({ ...propertyToEdit }); // Fill form with existing values
  setUpdateFormVisible(true);
};
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setUpdatedData(prev => ({ ...prev, [name]: value }));
};
const handleUpdateSubmit = () => {
  const token = localStorage.getItem("token");

  axios.put(`http://localhost:8081/api/Property/${editingProperty.id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then(response => {
      alert("Property updated successfully!");
      // Update local list
      setProperties(prev => prev.map(p => p.id === editingProperty.id ? response.data : p));
      setUpdateFormVisible(false);
      setEditingProperty(null);
        
    })
    .catch(error => {
      console.error("Error updating property:", error);
      alert("Failed to update property.");
    });
};


const [selectedProperty, setSelectedProperty] = useState(null);
const [detailsModalOpen, setDetailsModalOpen] = useState(false);

 const handleViewDetails = (property) => {
  setSelectedProperty(property);
  setDetailsModalOpen(true);
};





 const deleteProperty = (id) => {
    axios.delete(`http://localhost:8081/api/Property/${id}`,authHeader())
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
                  <Button color="primary" onClick={() => handleViewDetails(property)}>View Details</Button>

<Button color="danger" className='ms-2' onClick={() => deleteProperty(property.id)}>Delete</Button>
               <Button color='success' className='ms-4' onClick={()=>UpdateProperty(property.id)}> Update</Button>
                </CardBody>
              </Card>
            </Col>
          ))
        )}
      </Row>
      {updateFormVisible && (
  <div className="mt-5 p-4 border rounded bg-light">
    <h4>Edit Property</h4>
    <input
      type="text"
      name="type"
      value={updatedData.type}
      onChange={handleInputChange}
      placeholder="Type"
      className="form-control mb-2"
    />
    <input
      type="text"
      name="address"
      value={updatedData.address}
      onChange={handleInputChange}
      placeholder="Address"
      className="form-control mb-2"
    />
    <input
      type="number"
      name="price"
      value={updatedData.price}
      onChange={handleInputChange}
      placeholder="Price"
      className="form-control mb-2"
    />
 

    
    <Button color="success" onClick={handleUpdateSubmit}>Save Changes</Button>
    <Button color="secondary" className="ms-2" onClick={() => setUpdateFormVisible(false)}>Cancel</Button>
  </div>
)}
<Modal isOpen={detailsModalOpen} toggle={() => setDetailsModalOpen(!detailsModalOpen)}>
  <ModalHeader toggle={() => setDetailsModalOpen(!detailsModalOpen)}>
    Property Details
  </ModalHeader>
  <ModalBody>
    {selectedProperty && (
      <div>
        <p><strong>Type:</strong> {selectedProperty.type}</p>
        <p><strong>Address:</strong> {selectedProperty.address}</p>
        <p><strong>Price:</strong> ₹{selectedProperty.price}</p>
        <p><strong>Description:</strong> Awesome and Comfortable Property</p>
        {/* Add more fields as needed */}
      </div>
    )}
  </ModalBody>
</Modal>

    </Container>
  );
};

export default Properties;
