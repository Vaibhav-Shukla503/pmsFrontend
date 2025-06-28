import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { motion, AnimatePresence } from 'framer-motion';

import Home from './home';
import About from './About';
import Profile from './Profile';
import Properties from './Properties';
import PropertyForm from './PropertyForm';
import Logout from './Logout';


const pageVariants = {
  initial: { opacity: 0, x: 50 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -50 },
};

const pageTransition = {
  type: "spring",
  stiffness: 80,
  damping: 20,
};

const Seller = () => {
  const location = useLocation();

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        
        <Col md="2" className="bg-dark text-white p-3 shadow-lg">
          <h4 className="mb-4 text-center">🏠 Propertijo</h4>
          <ListGroup flush>
            {[
              { path: "/seller/home", label: "Home" },
              { path: "/seller/profile", label: "Profile" },
              { path: "/seller/about", label: "About" },
              { path: "/seller/properties", label: "Properties" },
              { path: "/seller/add-property", label: "Add Property" },
              { path: "/fileupload", label: "Add Documents" },
              {
                path: "/logout", label: "Logout",
              }
            ].map(({ path, label }) => (
              <ListGroupItem
                key={path}
                className="bg-dark border-0 p-0"
              >
                <Link
                  to={path}
                  className="text-white d-block p-2 px-3 link-hover btn btn-outline-light w-100 text-start mb-2 rounded d-flex align-items-center gap-2"
                  
                  style={{ borderRadius: '10px', transition: 'all 0.3s ease' }}
                >
                  {label}
                </Link>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>

        
        <Col md="10" className="p-4 bg-light">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Routes location={location} key={location.pathname}>
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/add-property" element={<PropertyForm />} />
               
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Col>
      </Row>

      <style>{`
        .link-hover:hover {
          background-color: #17a2b8;
          text-decoration: none;
          color: white;
          transform: translateX(5px);
        }
      `}</style>
    </Container>
  );
};

export default Seller;
