import React, { Component } from "react";
import "../../../bootstrap.css";
import "../../css/user/SearchUserComponent.css";
import {
  deleteTweet,
  getUserByUserName,
  getUserTweets,
  getUserTweets1,
  likeTweet,
} from "../RestApiComponent";
import TokenSessionStorage from "../TokenSessionStorage";
import CommentsComponent from "../tweet/CommentsComponent";
import moment from "moment";

export default class SearchUserComponent extends Component {
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
  }

  profileView() {
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

  allUsersHandler() {
    this.props.navigate("/allUsers");
  }

  searchClicked() {
    if (this.state.userName === "") {
      return;
    } else {
      TokenSessionStorage.searchUser(this.state.userName);
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
          TokenSessionStorage.logout();
          this.props.navigate("/error");
        } else {
          TokenSessionStorage.logout();
          this.props.navigate("/logout");
        }
      }
    );
  }

  replyClicked(tweet) {
    //console.log(JSON.stringify(tweet));
    TokenSessionStorage.addReplyTWeet(JSON.stringify(tweet));
    this.props.navigate("/reply");
  }

  editTweet(tweet) {
    TokenSessionStorage.updateTweet(JSON.stringify(tweet));
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
          TokenSessionStorage.logout();
          this.props.navigate("/logout");
        }
        if (error.status === 500) {
          TokenSessionStorage.logout();
          this.props.navigate("/error");
        } else {
          TokenSessionStorage.logout();
          this.props.navigate("/logout");
        }
      }
    );
    getUserTweets1(sessionStorage.getItem("userName")).then(
      (response) => {
        console.log(response.data);
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
          // this.props.navigate("/logout");
        }
      }
    );
  }

  commentsHandler(comments, loginId, tweet, postedOn, tweetId) {
    if (comments !== null) {
      this.setState({
        commentsClicked: !this.state.commentsClicked,
        tweet: {
          loginId: loginId,
          userTweet: tweet,
          postedOn: postedOn,
        },
        comments: comments,
        lockedTweetId: tweetId,
      });
      // this.setState({ comments: replies, commentsClicked: true });
    } else {
      this.setState({
        commentsClicked: !this.state.commentsClicked,
        lockedTweetId: tweetId,
        comments: null,
      });
    }
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
          TokenSessionStorage.removeUpdateTweetStoreId("updateId");
          TokenSessionStorage.logout();
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
          <a className="navbar-brand brand" href="/dashboard">
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
          {/* {this.state.userNotFoundErr !== "" ? (
            <div className="searchUserText"> this.state.userNotFoundErr </div>
          ) : (
            ""
          )} */}

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
                                postedTweet.postedOn,
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

                        {this.state.commentsClicked &&
                        this.state.comments !== null &&
                        postedTweet.id === this.state.lockedTweetId ? (
                          <CommentsComponent
                            comments={this.state.comments}
                            tweet={this.state.tweet}
                            tweetId={this.state.lockedTweetId}
                          />
                        ) : (
                          this.state.commentsClicked &&
                          this.state.comments === null &&
                          postedTweet.id === this.state.lockedTweetId && (
                            <div className="commentsText">
                              No comments yet. Click on reply to add one.
                            </div>
                          )
                        )}
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
