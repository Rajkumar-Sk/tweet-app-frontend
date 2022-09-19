import React, { Component } from "react";
import "../../../bootstrap.css";
import { loginUser } from "../ApiService";
import "./../../css/tweetappuser/Login.css";
import UtilsSessionStorage from "../UtilsSessionStorage.js";

export default class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      userName: "",
      password: "",
      token: "",
      emptyUsernameError: "",
      emptyPasswordError: "",
      invalidCredentials: false,
      formValid: false,
      isUsernameFieldTouched: false,
      isPasswordFieldTouched: false,
    };
    this.loginClick = this.loginClick.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
  }

  handleEventChange(event) {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => this.onKeyStrokeValidation([event.target.name])
    );
  }

  onKeyStrokeValidation(fieldName) {
    if (this.state.userName !== "") {
      this.setState({ emptyUsernameError: "" });
    }
    if (this.state.password !== "") {
      this.setState({ emptyPasswordError: "" });
    }
  }

  formValidation() {
    let formValid = false;
    if (this.state.userName === "") {
      this.setState({ emptyUsernameError: "Username must not be empty" });
      formValid = false;
    } else {
      this.setState({ emptyUsernameError: "" });
      formValid = true;
    }
    if (this.state.password === "") {
      this.setState({ emptyPasswordError: "Password must not be empty" });
      formValid = false;
    } else {
      this.setState({ emptyPasswordError: "" });
      formValid = true;
    }
    return formValid;
  }

  loginClick() {
    if (this.formValidation()) {
      loginUser(this.state.userName, this.state.password).then(
        (response) => {
          if (response.status === 200) {
            this.setState({
              token: response.data.token,
              invalidCredentials: false,
            });
            UtilsSessionStorage.loginSuccessful(response.data.token);
            this.props.navigate("/dashboard");
          }
        },
        (error) => {
          if (error.response.status === 401) {
            this.setState({ invalidCredentials: true });
          }
          if (error.response.status === 500) {
            this.setState({ invalidCredentials: true });
            this.props.navigate("/error");
          }
        }
      );
    }
  }

  handleCreateAccount = () => {
    this.props.navigate("/register");
  };

  handleForgotPassword = () => {
    this.props.navigate("/forgotpassword");
  };

  render() {
    return (
      <div>
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
        <div className="LoginComponent">
          <form className="Auth-form">
            <div className="Auth-form-content">
              {this.state.invalidCredentials ? (
                <div className="invalidCredentials">
                  Invalid Username or Password
                </div>
              ) : (
                ""
              )}
              <div className="form-group mt-3">
                <label className="usernameLabel">Username</label>
                <div className="error">
                  {this.state.emptyUsernameError !== ""
                    ? this.state.emptyUsernameError
                    : ""}
                </div>
                <input
                  type="type"
                  className={
                    this.state.emptyUsernameError !== ""
                      ? "form-control mt-1 input"
                      : "form-control mt-1"
                  }
                  name="userName"
                  placeholder=""
                  onChange={this.handleEventChange}
                  onBlur={() => this.setState({ isUsernameFieldTouched: true })}
                  required={true}
                />
              </div>
              <div className="form-group mt-3">
                <label className="passwordLabel">Password</label>
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
                      : "form-control mt-1"
                  }
                  name="password"
                  placeholder=""
                  onChange={this.handleEventChange}
                  onBlur={() => this.setState({ isPasswordFieldTouched: true })}
                  required={true}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button
                  type="button"
                  className="btnNew"
                  onClick={this.loginClick}
                >
                  Log in
                </button>
              </div>
              <div className="link">
                <a
                  className="createAccountText"
                  onClick={this.handleCreateAccount}
                >
                  Create account
                </a>
                <a
                  className="forgotPasswordText"
                  onClick={this.handleForgotPassword}
                >
                  Forgot password
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
