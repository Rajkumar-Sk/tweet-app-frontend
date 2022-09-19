import React, { Component } from "react";
import "../../../bootstrap.css";
import "../../css/tweetappuser/SearchUser.css";
import {
  deleteTweet,
  getUserByUserName,
  getUserTweets,
  getUserTweets1,
  likeTweet,
} from "../ApiService";
import UtilsSessionStorage from "../UtilsSessionStorage";
import moment from "moment";

export default class SearchUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: [],
      userTweets: [],
      userName: "",
      userNotFoundErr: "",
    };
    this.logoutClick = this.logoutClick.bind(this);
    this.profileView = this.profileView.bind(this);
    this.myTweetView = this.myTweetView.bind(this);
    this.addTweet = this.addTweet.bind(this);
    this.searchClicked = this.searchClicked.bind(this);
    this.allUsersHandler = this.allUsersHandler.bind(this);
    this.likeClicked = this.likeClicked.bind(this);
    this.replyClicked = this.replyClicked.bind(this);
    this.editTweet = this.editTweet.bind(this);
    this.commentsHandler = this.commentsHandler.bind(this);
    this.deleteClicked = this.deleteClicked.bind(this);
  }

  profileView() {
    this.props.navigate("/dashboard");
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

  allUsersHandler() {
    this.props.navigate("/allUsers");
  }

  searchClicked() {
    if (this.state.userName === "") {
      return;
    } else {
      UtilsSessionStorage.searchUser(this.state.userName);
      this.componentDidMount();
    }
  }

  likeClicked(id) {
    likeTweet(id).then(
      (response) => {
        if (response.status === 200) {
          this.componentDidMount();
        }
      },
      (error) => {
        if (error.status === 500) {
          UtilsSessionStorage.logout();
          this.props.navigate("/error");
        } else {
          UtilsSessionStorage.logout();
          this.props.navigate("/logout");
        }
      }
    );
  }

  replyClicked(tweet) {
    UtilsSessionStorage.addReplyTWeet(JSON.stringify(tweet));
    this.props.navigate("/reply");
  }

  editTweet(tweet) {
    UtilsSessionStorage.updateTweet(JSON.stringify(tweet));
    this.props.navigate("/edit");
  }

  componentDidMount() {
    getUserByUserName().then(
      (response) => {
        if (response.status === 200) {
          this.setState({
            userProfile: response.data,
          });
        }
      },
      (error) => {
        if (error.status === 401) {
          UtilsSessionStorage.logout();
          this.props.navigate("/logout");
        }
        if (error.status === 500) {
          UtilsSessionStorage.logout();
          this.props.navigate("/error");
        } else {
          UtilsSessionStorage.logout();
          this.props.navigate("/logout");
        }
      }
    );
    getUserTweets1(sessionStorage.getItem("userName")).then(
      (response) => {
        if (response.status === 200) {
          this.setState({
            userTweets: response.data,
          });
        }
      },
      (error) => {
        if (error.status === 500) {
          this.props.navigate("/error");
        }
        if (error.status === 401) {
          this.props.navigate("/logout");
        } else {
          console.log(error);
          this.setState({ userNotFoundErr: error.response.data.message });
        }
      }
    );
  }

  commentsHandler(replies, loginId, tweet, postedOn, tweetId) {
    let replyObj = {
      tweetId: tweetId,
      userId: loginId,
      userTweet: tweet,
      postedOn: postedOn,
    };
    sessionStorage.setItem("comments", JSON.stringify(replies));
    sessionStorage.setItem("replyObj", JSON.stringify(replyObj));
    this.props.navigate("/comments");
  }

  deleteClicked(tweetId) {
    deleteTweet(tweetId).then(
      (response) => {
        if (response.status === 200) {
          this.componentDidMount();
        }
      },
      (error) => {
        if (error.status === 500) {
          this.props.navigate("/error");
        }
        if (error.status === 401) {
          UtilsSessionStorage.removeUpdateTweetId("updateId");
          UtilsSessionStorage.logout();
          this.props.navigate("/logout");
        } else {
          this.props.navigate("/logout");
        }
      }
    );
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
              onClick={() => this.profileView()}
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

        <div className="SearchUserContainer">
          {this.state.userProfile.length > 0 ? (
            this.state.userProfile.map((user) => (
              <div key={user.loginId} className="card mb-3">
                <div className="card-body cardBody">
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
                {this.state.userTweets.length > 0
                  ? this.state.userTweets.reverse().map((postedTweet) => (
                      <div key={postedTweet.id} className="card-body-search">
                        <div className="tweetCardHeader">
                          <div className="loginIdText">
                            @{postedTweet.loginId}
                          </div>
                          <div className="postedTimeText">
                            {moment(postedTweet.postedTime).fromNow()}
                          </div>
                        </div>
                        <p className="card-text">{postedTweet.userTweet}</p>
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center m-1">
                          <button
                            type="button"
                            className="btnLike"
                            onClick={() => this.likeClicked(postedTweet.id)}
                          >
                            {postedTweet.like} Likes
                          </button>
                          <button
                            type="button"
                            className="commentBtn px-4"
                            onClick={() =>
                              this.commentsHandler(
                                postedTweet.replies,
                                postedTweet.loginId,
                                postedTweet.userTweet,
                                postedTweet.postedTime,
                                postedTweet.id
                              )
                            }
                          >
                            Comments
                          </button>
                          <button
                            type="button"
                            className="replyBtn px-4"
                            onClick={() =>
                              this.replyClicked({
                                tweetId: postedTweet.id,
                                replyTweet: postedTweet.userTweet,
                                postedBy: postedTweet.loginId,
                                postedOn: postedTweet.postedTime,
                              })
                            }
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
            ))
          ) : (
            <div className="searchUserText">
              {this.state.userNotFoundErr && this.state.userNotFoundErr}
            </div>
          )}
        </div>
      </div>
    );
  }
}
