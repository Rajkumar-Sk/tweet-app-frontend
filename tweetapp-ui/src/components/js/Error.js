import React, { Component } from "react";
import "../../bootstrap.css";
import "./../css/Error.css";

export default class Error extends Component {
  render() {
    return (
      <div className="ErrorComponent">
        <div className="Auth-form">
          <div className="Auth-form-content">
            <p className="text-success">Something went wrong</p>
            <p> Please try after sometime </p>
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
