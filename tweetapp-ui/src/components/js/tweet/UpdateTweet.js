import React, { Component } from "react";
import "../../../bootstrap.css";
import "./../../css/tweet/UpdateTweet.css";
import { updateTweet } from "../ApiService";
import UtilsSessionStorage from "../UtilsSessionStorage";

export default class UpdateTweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweet: "",
      tag: "",
      emptyTweetError: "",
      emptyTagError: "",
      userName: "",
    };
    this.handleEventChange = this.handleEventChange.bind(this);
    this.updateClicked = this.updateClicked.bind(this);
    this.logoutClick = this.logoutClick.bind(this);
    this.profileView = this.profileView.bind(this);
    this.myTweetView = this.myTweetView.bind(this);
    this.addTweet = this.addTweet.bind(this);
    this.homeHandler = this.homeHandler.bind(this);
    this.allUsers = this.allUsers.bind(this);
    this.searchClicked = this.searchClicked.bind(this);
  }

  handleEventChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  searchClicked() {
    if (this.state.userName === "") {
      return;
    } else {
      UtilsSessionStorage.searchUser(this.state.userName);
      this.props.navigate("/searchuser");
    }
  }

  updateClicked() {
    if (this.state.tweet === "") {
      this.setState({ emptyTweetError: "Tweet should not be empty" });
    } else if (Array.from(this.state.tweet).length > 144) {
      this.setState({
        emptyTweetError: "Tweet should not contain more than 144 characters",
      });
    } else if (
      this.state.tag !== "" &&
      Array.from(this.state.tag).length > 50
    ) {
      this.setState({
        emptyTagError: "Tag should not contain more than 50 characters",
      });
    } else {
      updateTweet(this.state.tweet, this.state.tag).then(
        (response) => {
          if (response.status === 201) {
            UtilsSessionStorage.removeUpdateTweet();
            this.props.navigate("/mytweets");
          }
        },
        (error) => {
          if (error.code === "ERR_BAD_REQUEST") {
            UtilsSessionStorage.removeUpdateTweet();
            UtilsSessionStorage.logout();
            this.props.navigate("/logout");
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
    UtilsSessionStorage.logout();
    this.props.navigate("/login");
  }

  addTweet() {
    this.props.navigate("/posttweet");
  }

  homeHandler() {
    this.props.navigate("/dashboard");
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
          <a
            className="navbar-brand brand"
            onClick={() => this.props.navigate("/dashboard")}
          >
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
        <div className="EditTweetComponent">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Update your tweet</h3>
              <div className="form-group mt-3">
                <div className="updateTweet">
                  "{JSON.parse(sessionStorage.getItem("updateTweet")).tweet}"
                </div>
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
                />
              </div>
              <div className="form-group mt-3">
                {/* <label className="updateTweetLabels">Tag</label> */}
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
                  onClick={() => this.updateClicked()}
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
