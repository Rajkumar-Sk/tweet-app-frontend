import React, { Component } from "react";
import "../../../bootstrap.css";
import "../../css/Tweet/PostTweetComponent.css";
import { postTweet } from "../RestApiComponent";
import TokenSessionStorage from "../TokenSessionStorage";

export default class PostTweetComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      userTweetId: "",
      userName: "",
      tweet: "",
      tag: "",
      like: 0,
      replyVo: [],
      likedBy: [],
      invalidCredentials: false,
      emptyTweetError: "",
      emptyTagError: "",
    };
    this.handleEventChange = this.handleEventChange.bind(this);
    this.postClick = this.postClick.bind(this);
    this.logoutClick = this.logoutClick.bind(this);
    this.profileView = this.profileView.bind(this);
    this.myTweetView = this.myTweetView.bind(this);
    this.homeHandler = this.homeHandler.bind(this);
    this.allUsersHandler = this.allUsersHandler.bind(this);
  }

  handleEventChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  postClick() {
    if (this.state.tweet === "") {
      this.setState({ emptyTweetError: "Tweet should not be empty" });
    } else if (Array.from(this.state.tweet).length > 144) {
      this.setState({
        emptyTweetError: "Tweet should not go beyond 144 characters",
      });
    } else if (
      this.state.tag !== "" &&
      Array.from(this.state.tag).length > 50
    ) {
      this.setState({
        emptyTagError: "Tag should not go beyond 50 characters",
      });
    } else {
      postTweet(this.state.userTweetId, this.state.tweet, this.state.tag).then(
        (response) => {
          if (response.status === 201) {
            this.props.navigate("/dashboard");
          }
        },
        (error) => {
          if (error.status === 401) {
            TokenSessionStorage.removeUpdateTweetStoreId("updateId");
            TokenSessionStorage.logout();
            this.props.navigate("/logout");
          }
          if (error.status === 400) {
          }
          if (error.status === 500) {
            this.props.navigate("/error");
          } else {
            this.props.navigate("/logout");
          }
        }
      );
    }
  }

  profileView() {
    this.props.navigate("/userprofile");
  }

  myTweetView() {
    this.props.navigate("/mytweets");
  }

  logoutClick() {
    TokenSessionStorage.logout();
    this.props.navigate("/login");
  }

  homeHandler() {
    this.props.navigate("/dashboard");
  }
  searchClicked() {
    if (this.state.userName === "") {
      return;
    } else {
      TokenSessionStorage.searchUser(this.state.userName);
      this.props.navigate("/searchuser");
    }
  }
  allUsersHandler() {
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
              onClick={() => this.allUsersHandler()}
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
        <div className="PostTweetComponent">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">What's happening?</h3>
              {this.state.invalidCredentials ? (
                <h3>Invalid Credentials</h3>
              ) : (
                ""
              )}
              <div className="form-group mt-3">
                {/* <label>Tweet</label> */}
                <div className="emptyTweetError">
                  {this.state.emptyTweetError !== ""
                    ? this.state.emptyTweetError
                    : ""}
                </div>
                <input
                  type="text"
                  className={
                    this.state.emptyTweetError !== ""
                      ? "form-control mt-1 input"
                      : "form-control mt-1"
                  }
                  name="tweet"
                  placeholder="Enter tweet"
                  onChange={this.handleEventChange}
                  required={true}
                />
              </div>
              <div className="form-group mt-3">
                {/* <label>tag</label> */}
                <div className="emptyTweetError">
                  {this.state.emptyTagError !== ""
                    ? this.state.emptyTagError
                    : ""}
                </div>
                <input
                  type="text"
                  className={
                    this.state.emptyTagError !== ""
                      ? "form-control mt-1 input"
                      : "form-control mt-1"
                  }
                  name="tag"
                  placeholder="Enter tag (Optional)"
                  onChange={this.handleEventChange}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button
                  type="button"
                  className="btnNew"
                  onClick={this.postClick}
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
