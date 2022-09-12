import React, { Component } from "react";
import "../../../bootstrap.css";
import { getUserDetail } from "../RestApiComponent";
import TokenSessionStorage from "../TokenSessionStorage";
import "./../../css/user/UserProfileComponent.css";

export default class UserProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: [],
      userName: "",
    };
    this.logoutClick = this.logoutClick.bind(this);
    this.homeHandler = this.homeHandler.bind(this);
    this.myTweetView = this.myTweetView.bind(this);
    this.addTweet = this.addTweet.bind(this);
    this.searchClicked = this.searchClicked.bind(this);
    this.allUsers = this.allUsers.bind(this);
  }

  homeHandler() {
    this.props.navigate("/dashboard");
  }
  myTweetView() {
    this.props.navigate("/mytweets");
  }
  logoutClick() {
    TokenSessionStorage.logout();
    this.props.navigate("/login");
  }
  addTweet() {
    this.props.navigate("/posttweet");
  }
  searchClicked() {
    if (this.state.userName === "") {
      return;
    } else {
      TokenSessionStorage.searchUser(this.state.userName);
      this.props.navigate("/searchuser");
    }
  }
  componentDidMount() {
    getUserDetail().then(
      (response) => {
        if (response.status === 200) {
          this.setState({
            userProfile: response.data,
          });
        }
      },
      (error) => {
        if (error.code === "ERR_NETWORK") {
          TokenSessionStorage.logout();
          this.props.navigate("/error");
        }
        if (error.code === "ERR_BAD_REQUEST") {
          TokenSessionStorage.logout();
          this.props.navigate("/logout");
        } else {
          TokenSessionStorage.logout();
          this.props.navigate("/logout");
        }
      }
    );
  }
  allUsers() {
    this.props.navigate("/allUsers");
  }
  render() {
    return (
      <div>
        <nav
          id="navigation"
          className="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top navbarContainer"
        >
          <a className="navbar-brand brand" href="/dashboard">
            TWEET APP
          </a>
          <div className="navbarContainer-1">
            <button
              type="button"
              className="btn btn-outline-secondary btn-md px-4"
              onClick={() => this.homeHandler()}
            >
              Home
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-md px-4"
              onClick={() => this.myTweetView()}
            >
              My Tweets
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-md px-4"
              onClick={() => this.addTweet()}
            >
              Add Tweet
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-md px-4"
              onClick={() => this.allUsers()}
            >
              All Users
            </button>
          </div>
          <div className="navbarContainer-2">
            <input
              type="text"
              className="form-control"
              name="userName"
              placeholder="Search User"
              onChange={(e) => this.setState({ userName: e.target.value })}
            />
            <button
              type="submit"
              className="btnNew"
              onClick={() => this.searchClicked()}
            >
              Search
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-md px-4"
              onClick={() => this.logoutClick()}
            >
              Logout
            </button>
          </div>
        </nav>
        <div className="userProfileContainer">
          {this.state.userProfile.map((user) => (
            <div key={user.loginId} className="card">
              <div className="card-body cardBody">
                <h5 className="card-title">Your Profile</h5>
                <div className="userDetails ">
                  <p className="card-text cardAlign">
                    Name: {user.firstName} {user.lastName}
                  </p>
                  <p className="card-text cardAlign">
                    Username: @{user.loginId}
                  </p>
                  <p className="card-text cardAlign">Email: {user.email}</p>
                  <p className="card-text cardAlign">
                    Contact Number: {user.contactNumber}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
