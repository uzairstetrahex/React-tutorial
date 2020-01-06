import React, { useState } from "react";

// import {
//   HelpBlock,
//   FormGroup,
//   FormControl,
//   ControlLabel
// } from "react-bootstrap";

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Bootstrap from "react-bootstrap"

import LoaderButton from "../src/components/LoaderButton";
import { useFormFields } from "../src/libs/hooksLib";
import "./Signup.css";

export default function Signup(props) {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: ""
  });
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
            const rawResponse = await fetch('http://localhost:4000/users/register', 
            {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'secret': 'xyz123'
            },
            body: JSON.stringify({user: fields.email, password: fields.password})
          })
            .then(res => 
                {
                res.json()
                console.log(res.statusText)
            })
            .then((data) => {
                console.log(data)
                props.userHasAuthenticated(true);
                props.history.push("/");
            })
            .catch(console.log);
            const content = await rawResponse.json();

    //   const newUser = await Auth.signUp({
    //     username: fields.email,
    //     password: fields.password
    //   });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }
  
  async function handleConfirmationSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
   //   await Auth.confirmSignUp(fields.email, fields.confirmationCode);
   //   await Auth.signIn(fields.email, fields.password);
  
      props.userHasAuthenticated(true);
      props.history.push("/");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  // function renderConfirmationForm() {
  //   return (
  //     <Form onSubmit={handleConfirmationSubmit}>
  //       <Form.Group controlId="confirmationCode" bssize="large">
  //         <ControlLabel>Confirmation Code</ControlLabel>
  //         <Form.Control
  //           autoFocus
  //           type="tel"
  //           onChange={handleFieldChange}
  //           value={fields.confirmationCode}
  //         />

  //       </Form.Group>
  //       <LoaderButton
  //         block
  //         type="submit"
  //         bssize="large"
  //         isLoading={isLoading}
  //         disabled={!validateConfirmationForm()}
  //       >
  //         Verify
  //       </LoaderButton>
  //     </Form>
  //   );
  // }

  function renderForm() {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" bssize="large">
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="password" bssize="large">
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" bssize="large">
          <Form.Control
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </Form.Group>
        <LoaderButton
          block
          type="submit"
          bssize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </LoaderButton>
      </Form>
    );
  }

  return (
    <div className="Signup">
      {newUser === null ? renderForm() : renderForm()}
    </div>
  );
}