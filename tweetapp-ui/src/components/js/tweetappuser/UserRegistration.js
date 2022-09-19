import React, { Component } from "react";
import "../../../bootstrap.css";
import "../../css/tweetappuser/UserRegistration.css";
import { registerUser } from "../ApiService";

const ALPHABETS_ONLY_REGEX = /^[A-Za-z]+$/;
const NUMERICALS_ONLY_REGEX = /^\d{10}$/;
export default class UserRegistration extends Component {
  constructor(props) {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      loginId: "",
      password: "",
      confirmPassword: "",
      contactNumber: "",
      secretKey: "",
      invalidDataFound: false,
      emptyFirstnameError: "",
      emptyLastnameError: "",
      emptyEmailError: "",
      emptyLoginIdError: "",
      emptyPasswordError: "",
      emptyConfirmPasswordError: "",
      emptyContactNumberError: "",
      emptySecretKeyError: "",
      fieldError: false,
      passwordFieldError: false,
    };
    this.handleEventChange = this.handleEventChange.bind(this);
    this.registerClick = this.registerClick.bind(this);
  }

  handleEventChange(event) {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => this.onKeyStrokeValidation()
    );
  }

  onKeyStrokeValidation() {
    if (
      this.state.firstName !== "" &&
      ALPHABETS_ONLY_REGEX.test(this.state.firstName)
    ) {
      this.setState({
        emptyFirstnameError: "",
      });
    } else if (
      this.state.firstName !== "" &&
      !ALPHABETS_ONLY_REGEX.test(this.state.firstName)
    ) {
      this.setState({
        emptyFirstnameError: "First name must contain only alphabets",
      });
    }
    if (
      this.state.lastName !== "" &&
      ALPHABETS_ONLY_REGEX.test(this.state.lastName)
    ) {
      this.setState({
        emptyLastnameError: "",
      });
    } else if (
      this.state.lastName !== "" &&
      !ALPHABETS_ONLY_REGEX.test(this.state.lastName)
    ) {
      this.setState({
        emptyLastnameError: "Last name must contain only alphabets",
      });
    }
    if (this.state.email !== "") {
      this.setState({
        emptyEmailError: "",
      });
    }
    if (this.state.loginId !== "" && this.state.loginId.length <= 50) {
      this.setState({
        emptyLoginIdError: "",
      });
    }
    if (
      this.state.password !== "" &&
      this.state.password.length >= 8 &&
      this.state.password.length <= 12
    ) {
      this.setState({
        emptyPasswordError: "",
      });
    } else if (this.state.password !== "") {
      this.setState({
        emptyPasswordError: "Password must contain characters between 8 to 12",
      });
    }
    if (this.state.confirmPassword !== "") {
      this.setState({
        emptyConfirmPasswordError: "",
      });
    }
    if (
      this.state.contactNumber !== "" &&
      NUMERICALS_ONLY_REGEX.test(this.state.contactNumber) &&
      this.state.contactNumber.length === 10
    ) {
      this.setState({
        emptyContactNumberError: "",
      });
    } else if (
      this.state.contactNumber !== "" &&
      this.state.contactNumber.length !== 10 &&
      !NUMERICALS_ONLY_REGEX.test(this.state.contactNumber)
    ) {
      this.setState({
        emptyContactNumberError: "Contact number must contain only 10 digits",
      });
    }
    if (this.state.secretKey !== "") {
      this.setState({
        emptySecretKeyError: "",
      });
    }
    if (this.state.password === this.state.confirmPassword) {
      this.setState({
        passwordFieldError: false,
      });
    }
  }

  formValidation() {
    let formValid = true;
    if (this.state.firstName === "") {
      this.setState({
        emptyFirstnameError: "First name must not be empty",
      });
      formValid = false;
    }
    if (this.state.lastName === "") {
      this.setState({
        emptyLastnameError: "Last name must not be empty",
      });
      formValid = false;
    }
    if (this.state.email === "") {
      this.setState({
        emptyEmailError: "Email must not be empty",
      });
      formValid = false;
    }
    if (this.state.loginId === "") {
      this.setState({
        emptyLoginIdError: "Username must not be empty",
      });
      formValid = false;
    }
    if (this.state.password === "") {
      this.setState({
        emptyPasswordError: "Password must not be empty",
      });
      formValid = false;
    }
    if (this.state.confirmPassword === "") {
      this.setState({
        emptyConfirmPasswordError: "Confirm password must not be empty",
      });
      formValid = false;
    }
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        emptyPasswordError: "Password and Confirm password must be same",
        emptyConfirmPasswordError: "Password and Confirm password must be same",
        passwordFieldError: true,
      });
      formValid = false;
    }
    if (this.state.contactNumber === "") {
      this.setState({
        emptyContactNumberError: "Contact number must not be empty",
      });
      formValid = false;
    }
    if (this.state.secretKey === "") {
      this.setState({
        emptySecretKeyError: "Secret key must not be empty",
      });
      formValid = false;
    }
    return formValid;
  }

  registerClick(e) {
    e.preventDefault();
    if (this.formValidation()) {
      registerUser(
        this.state.firstName,
        this.state.lastName,
        this.state.email,
        this.state.loginId,
        this.state.password,
        this.state.confirmPassword,
        this.state.contactNumber,
        this.state.secretKey
      ).then(
        (response) => {
          if (response.status === 201) {
            this.props.navigate("/login");
            alert("Your account has been created. Please log in.");
          }
        },
        (error) => {
          if (error.response.status === 500) {
            if (
              error.response.data.message.includes(
                "E11000 duplicate key error collection: tweet-app.tweetAppUser index: email dup key:"
              )
            ) {
              this.setState({
                emptyEmailError:
                  "Account with same email already exists. Please use another email",
              });
            }
            if (error.response.data.message.includes("loginId dup key")) {
              this.setState({
                emptyLoginIdError:
                  "Account with same username already exists. Please use another username",
              });
            }
          } else {
            this.props.navigate("/error");
          }
        }
      );
    }
  }
  render() {
    return (
      <div className="RegisterComponent">
        <nav
          id="navigation"
          className="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top"
        >
          <a
            className="navbar-brand brand"
            onClick={() => this.props.navigate("/")}
          >
            TWEET APP
          </a>
        </nav>
        <form className="auth-form">
          <div className="Auth-form-content">
            <div className="signUpText">
              Sign up to see tweets from your friends
            </div>
            <div className="form-group mt-3">
              <label className="label">First name</label>
              <div className="error">
                {this.state.emptyFirstnameError !== ""
                  ? this.state.emptyFirstnameError
                  : ""}
              </div>
              <input
                type="text"
                className={
                  this.state.emptyFirstnameError !== ""
                    ? "form-control mt-1 input"
                    : "form-control mt-1"
                }
                name="firstName"
                onChange={this.handleEventChange}
                required={true}
              />
            </div>
            <div className="form-group mt-3">
              <label className="label">Last name</label>
              <div className="error">
                {this.state.emptyLastnameError !== ""
                  ? this.state.emptyLastnameError
                  : ""}
              </div>
              <input
                type="text"
                className={
                  this.state.emptyLastnameError !== ""
                    ? "form-control mt-1 input"
                    : "form-control mt-1"
                }
                name="lastName"
                onChange={this.handleEventChange}
                required={true}
              />
            </div>
            <div className="form-group mt-3">
              <label className="label">Email</label>
              <div className="error">
                {this.state.emptyEmailError !== ""
                  ? this.state.emptyEmailError
                  : ""}
              </div>
              <input
                type="email"
                className={
                  this.state.emptyEmailError !== ""
                    ? "form-control mt-1 input"
                    : "form-control mt-1"
                }
                name="email"
                onChange={this.handleEventChange}
                required={true}
              />
            </div>
            <div className="form-group mt-3">
              <label className="label">Username</label>
              <div className="error">
                {this.state.emptyLoginIdError !== ""
                  ? this.state.emptyLoginIdError
                  : ""}
              </div>
              <input
                type="text"
                className={
                  this.state.emptyLoginIdError !== ""
                    ? "form-control mt-1 input"
                    : "form-control mt-1"
                }
                name="loginId"
                onChange={this.handleEventChange}
                required={true}
              />
            </div>
            <div className="form-group mt-3">
              <label className="label">Password</label>
              <div className="error">
                {this.state.emptyPasswordError !== ""
                  ? this.state.emptyPasswordError
                  : ""}
              </div>
              <input
                type="password"
                className={
                  this.state.emptyPasswordError !== ""
                    ? "form-control mt-1 input"
                    : this.state.passwordFieldError
                    ? "form-control mt-1 input"
                    : "form-control mt-1"
                }
                name="password"
                onChange={this.handleEventChange}
                required={true}
              />
            </div>
            <div className="form-group mt-3">
              <label className="label">Confirm password</label>
              <div className="error">
                {this.state.emptyConfirmPasswordError !== ""
                  ? this.state.emptyConfirmPasswordError
                  : ""}
              </div>
              <input
                type="password"
                className={
                  this.state.emptyConfirmPasswordError !== ""
                    ? "form-control mt-1 input"
                    : this.state.passwordFieldError
                    ? "form-control mt-1 input"
                    : "form-control mt-1"
                }
                name="confirmPassword"
                onChange={this.handleEventChange}
                required={true}
              />
            </div>
            <div className="form-group mt-3">
              <label className="label">Contact number</label>
              <div className="error">
                {this.state.emptyContactNumberError !== ""
                  ? this.state.emptyContactNumberError
                  : ""}
              </div>
              <input
                type="text"
                className={
                  this.state.emptyContactNumberError !== ""
                    ? "form-control input"
                    : "form-control mt-1"
                }
                name="contactNumber"
                onChange={this.handleEventChange}
                required={true}
              />
            </div>
            <div className="form-group mt-3">
              <label className="label">Secret key</label>
              <div className="error">
                {this.state.emptySecretKeyError !== ""
                  ? this.state.emptySecretKeyError
                  : ""}
              </div>
              <input
                type="text"
                className={
                  this.state.emptySecretKeyError !== ""
                    ? "form-control mt-1 input"
                    : "form-control mt-1"
                }
                name="secretKey"
                onChange={this.handleEventChange}
                required={true}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="button"
                className="btnNew"
                onClick={this.registerClick}
              >
                Sign up
              </button>
              <div className="liLink">
                <div className="loginText">
                  Already have an account?
                  <div
                    className="loginLinkReg"
                    onClick={() => this.props.navigate("/login")}
                  >
                    Log in
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
