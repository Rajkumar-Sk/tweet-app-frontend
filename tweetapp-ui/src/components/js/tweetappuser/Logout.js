import React, { Component } from "react";
import "../../../bootstrap.css";
import "./../../css/tweetappuser/Logout.css";

export default class Logout extends Component {
  render() {
    return (
      <div className="LogoutComponent">
        <div className="Auth-form">
          <div className="Auth-form-content">
            <p className="text-success">Logged out</p>
            <p> Your session has been timed out. Please log in again.</p>
            <p>
              <a href="/" className="btnNew px-4">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
