import React, { Component } from "react";
import "../../../bootstrap.css";
import "../../css/Tweet/ReplyComponent.css";
import { replyTweet } from "../RestApiComponent";
import TokenSessionStorage from "../TokenSessionStorage";
import moment from "moment";

export default class ReplyComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      replied: "",
      emptyTweetError: "",
      userName: "",
    };
    this.handleEventChange = this.handleEventChange.bind(this);
    this.logoutClick = this.logoutClick.bind(this);
    this.profileView = this.profileView.bind(this);
    this.myTweetView = this.myTweetView.bind(this);
    this.homeHandler = this.homeHandler.bind(this);
    this.replyingTweet = this.replyingTweet.bind(this);
    this.searchClicked = this.searchClicked.bind(this);
    this.allUsers = this.allUsers.bind(this);
    this.addTweet = this.addTweet.bind(this);
  }

  handleEventChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
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

  allUsers() {
    this.props.navigate("/allUsers");
  }

  replyingTweet() {
    if (this.state.replied === "") {
      this.setState({ emptyTweetError: "Reply should not be empty" });
    } else if (Array.from(this.state.replied).length > 144) {
      this.setState({
        emptyTweetError: "Reply should not contain more than 144 characters",
      });
    } else {
      replyTweet(
        JSON.parse(sessionStorage.getItem("replyTweet")).tweetId,
        this.state.replied
      ).then(
        (response) => {
          if (response.status === 201) {
            TokenSessionStorage.removeReplyId();
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
            this.props.navigate("/logout");
          } else {
            this.props.navigate("/error");
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
        <div className="ReplyComponent">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Post your reply for the tweet</h3>
              <div className="form-group mt-3">
                <div className="userHeader">
                  <p className="loginIdText">
                    @{JSON.parse(sessionStorage.getItem("replyTweet")).postedBy}
                  </p>
                  <p className="postedOnText">
                    {moment(
                      JSON.parse(sessionStorage.getItem("replyTweet")).postedOn
                    ).fromNow()}
                  </p>
                </div>
                <div className="tweetReply">
                  {JSON.parse(sessionStorage.getItem("replyTweet")).replyTweet}
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
                  name="replied"
                  placeholder="Add a reply..."
                  onChange={this.handleEventChange}
                  required={true}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button
                  type="button"
                  className="btnNew"
                  onClick={() => this.replyingTweet()}
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
