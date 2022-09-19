import moment from "moment";
import React, { Component, useEffect, useState } from "react";
import UtilsSessionStorage from "../UtilsSessionStorage";
import "./../../css/tweet/Comments.css";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsObj: JSON.parse(sessionStorage.getItem("comments")),
      replyObj: JSON.parse(sessionStorage.getItem("replyObj")),
      reply: "",
      user: 'JSON.parse(localStorage.getItem("user"))',
      error: "",
    };

    this.logoutClick = this.logoutClick.bind(this);
    this.profileView = this.profileView.bind(this);
    this.addTweet = this.addTweet.bind(this);
    this.homeHandler = this.homeHandler.bind(this);
    this.allUsers = this.allUsers.bind(this);
    this.searchClicked = this.searchClicked.bind(this);
    this.replyClicked = this.replyClicked.bind(this);
  }

  profileView() {
    this.props.navigate("/mytweets");
  }

  homeHandler() {
    this.props.navigate("/dashboard");
  }

  logoutClick() {
    UtilsSessionStorage.logout();
    this.props.navigate("/logout");
  }

  addTweet() {
    this.props.navigate("/posttweet");
  }

  allUsers() {
    this.props.navigate("/allUsers");
  }

  searchClicked() {
    if (this.state.userName === "") {
      return;
    } else {
      UtilsSessionStorage.searchUser(this.state.userName);
      this.props.navigate("/searchuser");
    }
  }

  replyClicked(tweet) {
    UtilsSessionStorage.addReplyTWeet(JSON.stringify(tweet));
    this.props.navigate("/reply");
  }

  render() {
    return (
      <div className="tweetCommentsContainer">
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
              onClick={() => this.profileView()}
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
        <div className="dashboardTweetCard">
          <div className="tweetCardHeader">
            <div className="loginIdText">@{this.state.replyObj.userId}</div>
            <div className="postedTimeText">
              {moment(this.state.replyObj.postedOn).fromNow()}
            </div>
          </div>
          <p className="card-text">{this.state.replyObj.userTweet}</p>
        </div>
        <div className="dashboardTweetCard">
          {/* <p className="commentsText">Comments</p> */}
          {this.state.commentsObj !== null ? (
            this.state.commentsObj.reverse().map((comment) => (
              <div key={comment.id} className="commentsCard">
                <div className="tweetCardHeader">
                  <div className="loginIdText">@{comment.repliedBy}</div>
                  <div className="postedTimeText">
                    {moment(comment.repliedOn).fromNow()}
                  </div>
                </div>
                <p className="card-text">{comment.userReply}</p>
              </div>
            ))
          ) : (
            <div>No comments yet.</div>
          )}
        </div>
      </div>
    );
  }
}

export default Comments;
