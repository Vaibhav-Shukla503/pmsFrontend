import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Card, CardBody } from 'reactstrap';
import axios from 'axios';
import { useNavigate ,Link } from 'react-router-dom';

const SignUp = () => {
   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    
    name:'',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
   
    axios.post('http://localhost:8081/api/users/',formData)
    .then(response=>{
      console.log(response.data);
       alert('Signup form submitted!');
       navigate('/login');
    }).catch(error=>{
      alert("not done");
      console.log("signup failed");
    });

  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px' }}>
        <CardBody className='bg-light'>
          <h3 className="text-center mb-4">Signup</h3>
          <Form onSubmit={handleSubmit}>
             <FormGroup className='mt-3'>
              <Label for="examplePassword">Name</Label>
              <Input
                id="examplename"
                name="name"
                placeholder="Enter your Name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup > 
            <FormGroup  className='mt-3'> 
              <Label for="exampleEmail">Email</Label>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="Enter your email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup  className='mt-3'>
              <Label for="examplePassword" >Password</Label>
              <Input
                id="examplePassword"
                name="password"
                placeholder="Enter your password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <Button color="primary" block type="submit">Signup</Button>
          
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default SignUp;
