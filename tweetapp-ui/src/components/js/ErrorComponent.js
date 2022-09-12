import React, { Component } from 'react';
import '../../bootstrap.css';
import './../css/ErrorComponent.css';

export default class ErrorComponent extends Component{


    render(){
        return(
            <div className="ErrorComponent">
                <div className="Auth-form">
                    <div className="Auth-form-content">
                        <p className="text-success">Something went wrong</p>
                        <p> Please try after sometime </p>
                        <p><a href="/login"  className="btn btn-outline-primary btn-md px-4">Log in</a></p>
                    </div>
                </div>
            </div>
        )
    }



}