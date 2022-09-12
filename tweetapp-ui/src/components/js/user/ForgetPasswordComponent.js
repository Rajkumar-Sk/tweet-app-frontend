import React, { Component } from "react";
import "../../../bootstrap.css";
import "../../css/user/ForgetPasswordComponent.css";
import { forgetPassword } from "../RestApiComponent";

export default class ForgetPasswordComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      userName: "",
      secret: "",
      newPassword: "",
      confirmNewPassword: "",
      emptyLoginId: "",
      emptyPassword: "",
      emptyConfirmPassword: "",
      emptySecretKey: "",
      fieldError: false,
      internalServerError: "",
      passwordFieldError: false,
    };
    this.handleEventChange = this.handleEventChange.bind(this);
    this.forgetPasswordClick = this.forgetPasswordClick.bind(this);
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
    if (this.state.userName !== "") {
      this.setState({
        emptyLoginId: "",
      });
    }
    if (this.state.secret !== "") {
      this.setState({
        emptySecretKey: "",
      });
    }
    if (this.state.newPassword !== "") {
      this.setState({
        emptyPassword: "",
      });
    }
    if (this.state.confirmNewPassword !== "") {
      this.setState({
        emptyConfirmPassword: "",
      });
    }
  }
  formValidation() {
    let formValid = true;
    if (this.state.userName === "") {
      this.setState({
        emptyLoginId: "Username should not be empty",
      });
      formValid = false;
    }
    if (this.state.secret === "") {
      this.setState({
        emptySecretKey: "Secret key should not be empty",
      });
      formValid = false;
    }
    if (this.state.newPassword === "") {
      this.setState({
        emptyPassword: "New password should not be empty",
      });
      formValid = false;
    }
    if (this.state.confirmNewPassword === "") {
      this.setState({
        emptyConfirmPassword: "Confirm new password should not be empty",
      });
      formValid = false;
    }
    if (this.state.confirmNewPassword !== this.state.newPassword) {
      this.setState({
        emptyConfirmPassword:
          "New password and confirm new password must be same",
        emptyPassword: "New password and confirm new password must be same",
        passwordFieldError: true,
      });
      formValid = false;
    }
    return formValid;
  }

  forgetPasswordClick(e) {
    e.preventDefault();
    if (this.formValidation()) {
      forgetPassword(
        this.state.userName,
        this.state.newPassword,
        this.state.secret
      ).then(
        (response) => {
          if (response.status === 200) {
            this.props.navigate("/login");
            alert(
              "Your password has been changed successfully. Please log in."
            );
          }
        },
        (error) => {
          if (error.response.status === 500) {
            this.setState({ internalServerError: error.response.data.message });
            // this.props.navigate("/error");
          } else {
            this.props.navigate("/logout");
          }
        }
      );
    }
  }

  render() {
    return (
      <div className="ForgetPasswordComponent">
        <nav
          id="navigation"
          className="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top"
        >
          <a className="navbar-brand brand" href="#">
            TWEET APP
          </a>
        </nav>
        <form className="Auth-form">
          <div className="internalServerError">
            {this.state.internalServerError && this.state.internalServerError}
          </div>
          <div className="Auth-form-content">
            {/* <h3 className="Auth-form-title">Change Password</h3> */}
            <div className="form-group mt-3">
              <label className="label">Username</label>
              <div className="error">
                {this.state.emptyLoginId !== "" ? this.state.emptyLoginId : ""}
              </div>
              <input
                type="type"
                className={
                  this.state.emptyLoginId !== ""
                    ? "form-control mt-1 input"
                    : "form-control mt-1"
                }
                name="userName"
                // placeholder="Enter username"
                value={this.state.loginId}
                onChange={this.handleEventChange}
                required={true}
              />
            </div>
            <div className="form-group mt-3">
              <label className="label">New password</label>
              <div className="error">
                {this.state.emptyPassword !== ""
                  ? this.state.emptyPassword
                  : ""}
              </div>
              <input
                type="password"
                className={
                  this.state.emptyPassword !== ""
                    ? "form-control mt-1 input"
                    : this.passwordFieldError
                    ? "form-control mt-1 input"
                    : "form-control mt-1"
                }
                name="newPassword"
                // placeholder="Enter password"
                value={this.state.newPassword}
                onChange={this.handleEventChange}
                required={true}
              />
            </div>
            <div className="form-group mt-3">
              <label className="label">Confirm new password</label>
              <div className="error">
                {this.state.emptyConfirmPassword !== ""
                  ? this.state.emptyConfirmPassword
                  : ""}
              </div>
              <input
                type="password"
                className={
                  this.state.emptyConfirmPassword !== ""
                    ? "form-control mt-1 input"
                    : this.passwordFieldError
                    ? "form-control mt-1 input"
                    : "form-control mt-1"
                }
                name="confirmNewPassword"
                // placeholder="Enter password"
                value={this.state.confirmNewPassword}
                onChange={this.handleEventChange}
                required={true}
              />
            </div>
            <div className="form-group mt-3">
              <label className="label">Secret key</label>
              <div className="error">
                {this.state.emptySecretKey !== ""
                  ? this.state.emptySecretKey
                  : ""}
              </div>
              <input
                type="type"
                className={
                  this.state.emptySecretKey !== ""
                    ? "form-control mt-1 input"
                    : "form-control mt-1"
                }
                name="secret"
                // placeholder="Enter secret key"
                value={this.state.secretKey}
                onChange={this.handleEventChange}
                required={true}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="button"
                className="btnNew"
                onClick={this.forgetPasswordClick}
              >
                Change password
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              <a className="loginLink" href="/login">
                Want to go back to log in?
              </a>
            </p>
          </div>
        </form>
      </div>
    );
  }
}
