import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

// import { useNavigate } from "react-router-dom";

function AdminLogin() {
  // let navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setErrorMsg("");

    // Basic validation
    if (!email || !password) {
      setErrorMsg("All fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    try {
      setShowSpinner(true);
      let backendurl = apiUrl + '/admin/login'
      const res = await axios.post(backendurl,
        {
        email,
        password,
      });

      if (res.data.success) {
        alert("Admin login successful!");
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("name", res.data.data.firstName);
        window.location.href = "/admin/dashboard"; // redirect
      } else {
        setErrorMsg(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      setErrorMsg("Server error. Please try again.", err);
    } finally {
      setShowSpinner(false);
    }
  }

  return (
   <Container
  fluid
  className="d-flex justify-content-center align-items-center vh-100 bg-dark"
  style={{
    background: "linear-gradient(135deg, #0f172a, #1e293b 45%, #0d6efd 100%)",
  }}
>
  <Row className="w-100 justify-content-center">
    <Col xs={10} sm={8} md={5} lg={4}>
      <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
        {/* Accent header strip */}
        <div className="bg-primary bg-gradient text-center py-4 px-4">
          <div
            className="bg-white bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
            style={{ width: "56px", height: "56px", fontSize: "24px" }}
          >
            🔒
          </div>
          <h3 className="text-white fw-bold mb-1">Admin Login Panel</h3>
          <p className="text-white-50 small mb-0">Sign in to manage your dashboard</p>
        </div>

        <Card.Body className="p-4 bg-white">
          {errorMsg && (
            <div className="alert alert-danger py-2 text-center rounded-3 mb-3">
              {errorMsg}
            </div>
          )}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="adminEmail">
              <Form.Label className="text-secondary fw-semibold small">
                Email
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-3 py-2 px-3"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="adminPassword">
              <Form.Label className="text-secondary fw-semibold small">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-3 py-2 px-3"
              />
            </Form.Group>

            <div className="d-grid mt-4">
              <Button
                type="submit"
                variant="primary"
                disabled={showSpinner}
                className="rounded-3 py-2 fw-semibold bg-gradient"
              >
                {showSpinner ? (
                  <Spinner animation="border" size="sm" role="status" className="me-2" />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>
  );
}

export default AdminLogin;
