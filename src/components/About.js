import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';

const About = () => {
  return (
    <div style={{
      background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
      minHeight: '100vh',
      paddingTop: '40px',
      paddingBottom: '40px'
    }}>
      <Container>
        <h2 className="text-center mb-5" style={{ fontWeight: 'bold' }}>About Propertijo</h2>
        
        <Row className="mb-5 align-items-center">
          <Col md="6">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              alt="Real estate"
              className="img-fluid rounded shadow"
            />
          </Col>
          <Col md="6">
            <h4>What is Propertijo?</h4>
            <p>
              Propertijo is a modern real estate web application built for property buyers and sellers. 
              It helps users seamlessly manage property listings, booking requests, document uploads, and profiles—all in one place.
            </p>
            <p>
               Propertijo offers a fast, reliable, and intuitive experience for users.
            </p>
          </Col>
        </Row>

        <h4 className="text-center mb-4">Core Features</h4>
        <Row>
          <Col md="4" className="mb-4">
            <Card className="shadow-sm border-0 h-100">
              <img src="https://images.unsplash.com/photo-1560185127-6ed189bf02f4" className="card-img-top" alt="Listings" />
              <CardBody>
                <CardTitle tag="h5">Property Listings</CardTitle>
                <CardText>Post, edit, and manage your properties easily with photos, pricing, and details.</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md="4" className="mb-4">
            <Card className="shadow-sm border-0 h-100">
              <img src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914" className="card-img-top" alt="Booking" />
              <CardBody>
                <CardTitle tag="h5">Booking Requests</CardTitle>
                <CardText>Buyers can request to book properties. Sellers receive, view, and manage these requests.</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md="4" className="mb-4">
            <Card className="shadow-sm border-0 h-100">
              <img src="https://images.unsplash.com/photo-1599423300746-b62533397364" className="card-img-top" alt="Secure Login" />
              <CardBody>
                <CardTitle tag="h5">Payement </CardTitle>
                <CardText>Secure and authentic payement we application.</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <div className="text-center mt-5">
          <p style={{ fontSize: "1.1rem" }}>Made with ❤️ by Vaibhav </p>
        </div>
      </Container>
    </div>
  );
};

export default About;
