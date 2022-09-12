import React, { Component } from "react";
import "../../../bootstrap.css";
import "../../css/user/AllUsersComponent.css";
import { allUsers, getUserByUserName } from "../RestApiComponent";
import TokenSessionStorage from "../TokenSessionStorage";

export default class AllUsersComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: [],
      userName: "",
    };
    this.logoutClick = this.logoutClick.bind(this);
    this.homeHandler = this.homeHandler.bind(this);
    this.profileView = this.profileView.bind(this);
    this.myTweetView = this.myTweetView.bind(this);
    this.addTweet = this.addTweet.bind(this);
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
  profileView() {
    this.props.navigate("/userprofile");
  }

  componentDidMount() {
    allUsers().then(
      (response) => {
        if (response.status === 200) {
          this.setState({
            userProfile: response.data,
          });
        }
      },
      (error) => {
        if (error.status === 500) {
          this.props.navigate("/logout");
        }
        if (error.status === 400) {
        } else {
          console.log("Something Went Wrong");
          this.props.navigate("/error");
        }
      }
    );
  }

  searchClicked() {
    if (this.state.userName === "") {
      return;
    } else {
      TokenSessionStorage.searchUser(this.state.userName);
      this.props.navigate("/searchuser");
    }
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
              onClick={() => this.profileView()}
            >
              Profile
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

        <div className="AllUsersContainer">
          {this.state.userProfile.length > 0 ? (
            this.state.userProfile.map((user) => (
              <div key={user.loginId} className="card mb-3">
                <div className="card-body cardBody">
                  {/* <h5 className="card-title">Search User Details</h5> */}
                  <div className="userDetails">
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
            ))
          ) : (
            <div className="searchUserText">No user found</div>
          )}
        </div>
      </div>
    );
  }
}
