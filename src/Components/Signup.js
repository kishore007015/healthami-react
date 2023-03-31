import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import '../Styles/Login.css';
import { serviceCall } from "../Utils/ServiceUtils";

const Signup = () => {

  const [formBody, setFormBody]= useState({
    firstName: "",
    firstNameErr: false,
    lastName: "",
    lastNameErr: false,
    username: "",
    usernameErr: false,
    role: "",
    roleErr: false,
    phone: "",
    phoneErr: false,
    email: "",
    emailErr: false,
    password: "",
    passwordErr: false,
    confirmPassword: "",
    confirmPasswordErr: false,
    captchaErr: false,
  });
  const [captchaCode, setCaptchaCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    refreshCaptcha();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { captchaValue } = e.target;
    if (captchaValue.value === captchaCode.trim().replace(/ /g,'')) {
      setFormBody((prev) => ({...prev, "captchaErr":false}));
      let reqBody = {
        "UserName": formBody.username,
        "FirstName": formBody.firstName,
        "LastName": formBody.lastName,
        "PhoneNumber": formBody.phone,
        "Password": formBody.password,
        "ConfirmPassword": formBody.password,
        "Email": formBody.email,
        "RoleId": formBody.role
      }
      const resp = await serviceCall("POST", "/API/Account/RegisterUser", reqBody);
      refreshCaptcha();
      if(resp && resp.IsError === false && resp.Message.includes("successfully")) {
        document.getElementById("resetResiterForm").click();
        setError("success");
      } else {
        resp ? setError(resp.Message) : setError("Something went wrong!");
      }
    } else {
      setFormBody((prev) => ({...prev, "captchaErr":true}));
      refreshCaptcha();
      setError("");
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const {id , value} = e.target;
    setFormBody((prev) => ({...prev, [id]:value}));
    setError("");
    setFormBody((prev) => ({...prev, "captchaErr":false}));
  }
  console.log(formBody)

  const handleInputBlur = (e) => {
    e.preventDefault();
    const {id , value} = e.target;
    let passWordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let phoneRegex = new RegExp("^[0-9]*$");  
    if(id === "email" || id === "password" || id === "phone" || id === "confirmPassword") {
      (id === "email") && setFormBody((prev) => ({...prev, "emailErr": value.length > 0 && !emailRegex.test(value) ? true : false}));
      (id === "password") && setFormBody((prev) => ({...prev, "passwordErr": value.length > 0 && !passWordRegex.test(value) ? true : false}));
      (id === "confirmPassword") && setFormBody((prev) => ({...prev, "confirmPasswordErr": value.length > 0 && !passWordRegex.test(value) ? true : false}));
      (id === "phone") && setFormBody((prev) => ({...prev, "phoneErr": value.length > 0 && phoneRegex.test(value) ? false : true}));
    } else {
      if(id !== "role" ) {
        setFormBody((prev) => ({...prev, [id+"Err"]: value.length > 20 ? true : false}));
      }
    }
    
  }

  function disabledChecks(){
    if (formBody.firstName.length > 0 && formBody.lastName.length > 0 && formBody.username.length > 0 && formBody.role.length > 0 && formBody.phone.length > 0 && formBody.email.length > 0 && formBody.password.length > 0 && formBody.confirmPassword.length > 0 && !formBody.firstNameErr &&
      !formBody.lastNameErr && !formBody.usernameErr && !formBody.roleErr && !formBody.phoneErr && !formBody.emailErr && !formBody.passwordErr && !formBody.confirmPasswordErr && !formBody.captchaErr) {
        return false;
    } else {
      return true;
    }

  }

  function randomNum(m, n) {
    return Math.floor(Math.random() * (n - m + 1) + m);
  }

  const originalCharacter =  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  

  const refreshCaptcha = (e) => {
    e && e.preventDefault();
    let captchaText = document.querySelector('#captcha');
    var ctx = captchaText.getContext("2d");
    ctx.font = "40px Roboto bold";
    ctx.fillStyle = "#08e5ff";
    ctx.clearRect(0, 0, captchaText.width, captchaText.height);

    let str = "";
    for (let i = 0; i < 5; i++) {
      let temp = originalCharacter[randomNum(0, originalCharacter.length - 1)];
      str = `${str}${temp} `;
    }
    setCaptchaCode(str);
    ctx.fillText(str,captchaText.width/4, captchaText.height/2);
  };

  return (
    <>
      <div className="loginBackground">
        <div className="container signup">
          <div className="login-content">
            <Form onSubmit={handleSubmit}>
              
              <h3 className="mb-3 p-4">Registration</h3>
              <div className="d-flex">
              <Form.Group className="mb-3 me-3" >
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="First Name"
                  className="input"
                  id="firstName"
                  onBlur={(e) => handleInputBlur(e)}
                  onChange={(e) => handleInputChange(e)}
                />
                {formBody.firstNameErr && <span className="fieldError">Maximun 20 characters are allowed </span> }
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Last Name"
                  className="input"
                  id="lastName"
                  onBlur={(e) => handleInputBlur(e)}
                  onChange={(e) => handleInputChange(e)}
                />
                {formBody.lastNameErr && <span className="fieldError">Maximun 20 characters are allowed </span> }
              </Form.Group>
              </div>
              <div className="d-flex">
              <Form.Group className="mb-3 me-3" >
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Username"
                  className="input"
                  id="username"
                  onBlur={(e) => handleInputBlur(e)}
                  onChange={(e) => handleInputChange(e)}
                />
                {formBody.usernameErr && <span className="fieldError">Maximun 20 characters are allowed </span> }
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Role"
                  className="input"
                  id="role"
                  onBlur={(e) => handleInputBlur(e)}
                  onChange={(e) => handleInputChange(e)}
                />
                {formBody.roleErr && <span className="fieldError">Maximun 20 characters are allowed </span> }
              </Form.Group>
              </div>
              <div className="d-flex">
              <Form.Group className="mb-3 me-3" >
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Phone"
                  className="input"
                  id="phone"
                  onBlur={(e) => handleInputBlur(e)}
                  onChange={(e) => handleInputChange(e)}
                />
                {formBody.phoneErr && <span className="fieldError">Enter a valid Number </span> }
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  autoComplete="off"
                  placeholder="Email Address"
                  className="input"
                  id="email"
                  onBlur={(e) => handleInputBlur(e)}
                  onChange={(e) => handleInputChange(e)}
                />
                {formBody.emailErr && <span className="fieldError">Invalid email address </span> }
              </Form.Group>
              </div>
              <div className="d-flex">
              <Form.Group className="mb-3 me-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="input"
                  id="password"
                  onBlur={(e) => handleInputBlur(e)}
                  onChange={(e) => handleInputChange(e)}
                />
               
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  className="input"
                  id="confirmPassword"
                  onBlur={(e) => handleInputBlur(e)}
                  onChange={(e) => handleInputChange(e)}
                />
               
              </Form.Group>
              
              </div>
              {formBody.passwordErr && <div><span className="fieldError">Password must be a minimum of 8 characters including Number, Upper,<br/> Lower and 
       one special character </span></div>}
              <Form.Group className="mb-3">
                <div style={{ "display": "flex" }}>
                  <canvas id="captcha">captcha text</canvas>
                  <button onClick={(e) => refreshCaptcha(e)}><span className="refresh">↻</span></button>
                </div>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Enter Captcha"
                  className="input"
                  id="captchaValue"
                  style={{ "width": "48%" }}
                  onChange={() => setFormBody((prev) => ({...prev, "captchaErr":false}))}
                />
                {formBody.captchaErr && <span className="fieldError">Invalid Captcha <br/></span> }
              </Form.Group>
              <div className="gap-2 mb-3">
                <Button variant="primary" type="Submit" className="btn me-2" disabled={disabledChecks()}>
                  Register
                </Button>
                <Button variant="primary" type="Reset" id="resetResiterForm" className="btn" onClick={() => (setFormBody({
                  firstName: "",firstNameErr: false, lastName: "", lastNameErr: false,username: "",usernameErr: false, role: "",roleErr: false,phone: "",
                  phoneErr: false,email: "",emailErr: false,password: "",passwordErr: false,confirmPassword: "",confirmPasswordErr: false, captchaErr: false}), setError(""))}>
                  Reset
                </Button>
              </div>
              { error && <Alert variant={`${error === "success" ? "success" : "danger"}`}>{(error === "success") ? "Registered Successfully." : error}</Alert>}
              <div className="p-4 mt-2 text-center signup">
                Already have an account? <Link to="/">Log In</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
