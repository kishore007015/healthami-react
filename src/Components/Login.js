import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import '../Styles/Login.css';
import { serviceCall } from "../Utils/ServiceUtils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgotPass, setForgotPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    let reqBody = {
      "UserName": userName,
      "Password": password
    }
    const resp = await serviceCall("POST", "/API/Account/Login", reqBody);
    if(resp.IsError === true) {
      setError(resp.Message);
    }
  };

  const forgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    const resp = await serviceCall("GET", "/API/Account/ForgotPassowrd?Email=" + email);
    setError(resp);
  };

  return (
    <>
    <div className="loginBackground">
        <div className="container login">
          <div className="login-content">
           {!forgotPass && <Form onSubmit={handleSubmit}>
              
              <h4 className="title p-4">Welcome</h4>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="userName"
                  placeholder="Username"
                  className="input"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="input"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="primary" type="Submit" className="btn" disabled={!userName || !password}>
                  Log In
                </Button>
              </div>
              {error && <Alert variant="danger" className="errorMgT">{error}</Alert>}
              <div className="p-4 mt-2 signup">
                Don't have an account? <Link to="/signup"> Sign up</Link>
              </div>
              <div className=" signup" onClick={() => (setForgotPass(true), setError(""))}>
              Forgot Password? <Link to="/"> Forgot Password</Link>
              </div>
            </Form>}
            {forgotPass && <Form onSubmit={forgotPassword}>
              
              <h4 className="title p-4">Enter Email Address</h4>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  className="input"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="primary" type="Submit" className="btn" disabled={!email}>
                  Send an Email
                </Button>
              </div>
              { error && <Alert variant={`${error.Message.includes("successfully") ? "success" : "danger"}`} className="mT10">{ error.Message}</Alert>}
              <div className="p-4 mt-2 text-center signup" onClick={() =>(setForgotPass(false),setError(""))}>
                Back to Sign in? <Link to="/"> Sign in</Link>
              </div>
            </Form>}

          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
