import React, { useState } from "react";
import axios from "axios";
import { authHeader } from "./authheader";
import {
  Container,
  Row,
  Col,
  Button,
  Input,
  Alert,
  Spinner,
  Card,
  CardBody,
  CardTitle
} from "reactstrap";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("❗ Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const response = await axios.post("http://localhost:8081/api/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
           ...authHeader().headers,
        },
      });
      setMessage(`✅ ${response.data}`);
    } catch (error) {
      setMessage("❌ Upload failed. Please try again.");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md="6">
          <Card className="shadow-sm border-0">
            <CardBody>
              <CardTitle tag="h4" className="mb-4 text-center text-primary">
                Upload Property File
              </CardTitle>

              <Input
                type="file"
                onChange={handleFileChange}
                className="mb-3"
              />

              <Button
                color="primary"
                onClick={handleUpload}
                disabled={uploading}
                block
              >
                {uploading ? <Spinner size="sm" /> : "Upload"}
              </Button>

              {message && (
                <Alert
                  color={message.startsWith("✅") ? "success" : "danger"}
                  className="mt-3"
                >
                  {message}
                </Alert>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FileUpload;
