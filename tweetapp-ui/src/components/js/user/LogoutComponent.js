import React, { Component } from "react";
import "../../../bootstrap.css";
import "./../../css/user/LogoutComponent.css";

export default class LogoutComponent extends Component {
  render() {
    return (
      <div className="LogoutComponent">
        <div className="Auth-form">
          <div className="Auth-form-content">
            <p className="text-success">Logged Out</p>
            <p> Your session has been timed out. Please log in again. </p>
            <p>
              <a href="/login" className="btnNew px-4">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
