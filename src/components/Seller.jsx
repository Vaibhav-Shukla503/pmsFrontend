import { Routes, Route, Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

import Home from "./home";
import About from "./About";
import Profile from "./Profile";
import Properties from "./Properties";
import PropertyForm from "./PropertyForm";

const Seller = () => {
  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col md="2" className="bg-dark text-white p-3">
          <h4>Propertijo</h4>
          <ListGroup flush>
            <ListGroupItem className="bg-dark border-0 p-0">
              <Link to="/seller/home" className="text-white d-block p-2">Home</Link>
            </ListGroupItem>
            <ListGroupItem className="bg-dark border-0 p-0">
              <Link to="/seller/profile" className="text-white d-block p-2">Profile</Link>
            </ListGroupItem>
            <ListGroupItem className="bg-dark border-0 p-0">
              <Link to="/seller/about" className="text-white d-block p-2">About</Link>
            </ListGroupItem>
            <ListGroupItem className="bg-dark border-0 p-0">
              <Link to="/seller/properties" className="text-white d-block p-2">Properties</Link>
            </ListGroupItem>
            <ListGroupItem className="bg-dark border-0 p-0">
              <Link to="/seller/add-property" className="text-white d-block p-2">Add Property</Link>
            </ListGroupItem>
          </ListGroup>
        </Col>

        <Col md="10" className="p-4">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/add-property" element={<PropertyForm />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default Seller;
