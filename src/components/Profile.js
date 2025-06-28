import React, { useEffect, useState ,useRef } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Form, FormGroup, Label, Input, Button,
  Card, CardBody, CardTitle, CardText, CardImg
} from 'reactstrap';
import { authHeader } from './authheader';
const Profile = () => {
  const [user, setUser] = useState({});
  const [editData, setEditData] = useState({});
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8081/api/users/${userId}`, {
            ...authHeader().headers,
        });
        setUser(response.data);
        setEditData(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8081/api/users/${userId}`,
        editData,
        {
          headers: {
            ...authHeader().headers,
            "Content-Type": "application/json"
          }
        }
      );
      alert("User updated successfully!");
      setUser(response.data);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Update failed.");
    }
  };
  const [selectedImage, setSelectedImage] = useState(null);
const fileInputRef = useRef();

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `http://localhost:8081/api/userdetail/${userId}/upload-image`,
      formData,
      {
        headers: {
           ...authHeader().headers,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Image uploaded!");
console.log(response)
    if (response.data.photoUrl) {
      setUser((prev) => ({
        ...prev,
        photoUrl: response.data.imageBase64,
      }));
    }
  } catch (error) {
    console.error("Upload failed:", error);
    alert("Failed to upload image.");
  }
};


  return (
    <Container className="mt-5">
      <Row>
        
        <Col md={5}>
          <Card className="shadow border-0">
                    <CardImg
          src={selectedImage ? URL.createObjectURL(selectedImage) : user.photoUrl || "https://i.pravatar.cc/150?img=68"}
          alt="Profile"
          className="rounded-circle mx-auto mt-4"
          style={{ width: "150px", height: "150px", objectFit: "cover", cursor: "pointer" }}
          onClick={() => fileInputRef.current.click()}
        />

        <input
  type="file"
  accept="image/*"
  ref={fileInputRef}
  style={{ display: "none" }}
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);      
      uploadImage(file);           
    }
  }}
/>

            <CardBody className="text-center">
              <CardTitle tag="h4">{user.name || 'User Name'}</CardTitle>
              <CardText className="text-muted"><i className="bi bi-envelope-fill me-2"></i>{user.email || 'user@example.com'}</CardText>
              <CardText className='text-muted'> <i className="bi bi-telephone-fill me-2"></i>{user.mobno||"user mobNo"}</CardText>
               <CardText className='text-muted'> <i className="bi bi-geo-alt-fill me-2 text-danger"></i> {user.address||"user address'"} </CardText> 
               
              <CardText>
                <strong>Role:</strong> {user.role||'Seller'}
              </CardText>
            </CardBody>
          </Card>
        </Col>

        
        <Col md={7}>
          <Card className="shadow border-0">
            <CardBody>
              <h4 className="mb-4">Edit Profile</h4>
              <Form>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    value={editData.name || ''}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    value={editData.email || ''}
                    onChange={handleChange}
                  />
                </FormGroup>
                 <FormGroup>
                  <Label for="mobno">Mobile Number</Label>
                  <Input
                    type="text"
                    name="mobno"
                    id="mobno"
                    placeholder="Enter your Mobile Number"
                    value={editData.mobno || ''}
                    onChange={handleChange}
                  />
                </FormGroup>
                 <FormGroup>
                  <Label for="address">Address</Label>
                  <Input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Enter your Address"
                    value={editData.address || ''}
                    onChange={handleChange}
                  />
                </FormGroup>

                

                <div className="text-end">
                  <Button color="primary" onClick={handleUpdate}>Save Changes</Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
