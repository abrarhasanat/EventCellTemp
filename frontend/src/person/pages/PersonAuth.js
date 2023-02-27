import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { personContext } from "../../shared/context/person-context";
import "./PersonAuth.css";
import { url, port } from "../../Constant";
const PersonAuth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          present_address: undefined,
          permanent_address: undefined,
          phone_number: undefined,
        },
        formState.inputs.email.isValid &&
          formState.inputs.name.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          address: {
            value: "",
            isValid: false,
          },
          phone_number: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `http://${url}:${port}/api/vendor/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        console.log("login Successfull");
        console.log(responseData.vendor);
        console.log(responseData.vendor.VENDOR_ID);
        auth.login(responseData.vendor.VENDOR_ID);
        auth.changeRule();
        
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          `http://${url}:${port}/api/vendor/signup`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            name: formState.inputs.name.value,
            passowrd: formState.inputs.passowrd.value,
            address: formState.inputs.address.value,
            phone_number: formState.inputs.phone_number.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        
        console.log(responseData);
        console.log(responseData.person.id);
        auth.login(responseData.person.id);
        auth.changeRule();
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Log In </h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          <Input
            element="input"
            id="email"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="invalid email address"
            onInput={inputHandler}
          />
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <Input
              element="input"
              id="address"
              type="text"
              label="Address"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a  valid address."
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="password must be atleast 6 digits"
            onInput={inputHandler}
          />
          {!isLoginMode && (
            <Input
              element="input"
              id="phone_number"
              type="number"
              label="Phone No"
              validators={[VALIDATOR_MINLENGTH(3)]}
              errorText="Please enter a valid Mobile No."
              onInput={inputHandler}
            />
          )}
          <Button type="submit">{isLoginMode ? "LOGIN" : "REGISTER"}</Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "REGISTER" : "LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default PersonAuth;
