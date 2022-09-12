import React, { Component } from "react";
import "../../../bootstrap.css";
import "./../../css/Tweet/MyTweetComponent.css";
import { deleteTweet, getUserTweets, likeTweet } from "../RestApiComponent";
import TokenSessionStorage from "../TokenSessionStorage";
import moment from "moment";
import CommentsComponent from "./CommentsComponent";

export default class MyTweetComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userTweet: [],
      tweet: {
        loginId: "",
        userTweet: "",
        postedOn: "",
      },
      commentsClicked: false,
      lockedTweetId: "",
      userName: "",
    };
    this.deleteClicked = this.deleteClicked.bind(this);
    this.editTweet = this.editTweet.bind(this);
    this.logoutClick = this.logoutClick.bind(this);
    this.profileView = this.profileView.bind(this);
    this.addTweet = this.addTweet.bind(this);
    this.commentsHandler = this.commentsHandler.bind(this);
    this.likeClicked = this.likeClicked.bind(this);
    this.replyClicked = this.replyClicked.bind(this);
    this.homeHandler = this.homeHandler.bind(this);
    this.allUsers = this.allUsers.bind(this);
    this.searchClicked = this.searchClicked.bind(this);
  }

  componentDidMount() {
    getUserTweets().then(
      (response) => {
        // console.log(response.data);
        if (response.status === 200) {
          this.setState({
            userTweet: response.data,
          });
        }
      },
      (error) => {
        if (error.status === 500) {
          this.props.navigate("/logout");
        }
        if (error.status === 401) {
          this.props.navigate("/logout");
        }
        if (error.status === 400) {
        } else {
          this.props.navigate("/error");
        }
      }
    );
  }

  likeClicked(id) {
    likeTweet(id).then(
      (response) => {
        if (response.status === 200) {
          this.componentDidMount();
        }
      },
      (error) => {
        console.log(error);
        if (error.status === 401) {
          this.props.navigate("/logout");
        }
        if (error.status === 400) {
        }
        if (error.status === 500) {
          this.props.navigate("/error");
        } else {
          console.log("Something Went Wrong");
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
          this.props.navigate("/error");
        }
      }
    );
  }

  profileView() {
    this.props.navigate("/userprofile");
  }

  homeHandler() {
    this.props.navigate("/dashboard");
  }

  logoutClick() {
    TokenSessionStorage.logout();
    this.props.navigate("/logout");
  }

  addTweet() {
    this.props.navigate("/posttweet");
  }

  allUsers() {
    this.props.navigate("/allUsers");
  }

  searchClicked() {
    console.log(this.state.userName);
    if (this.state.userName === "") {
      return;
    } else {
      TokenSessionStorage.searchUser(this.state.userName);
      this.props.navigate("/searchuser");
    }
  }

  replyClicked(tweet) {
    //console.log(JSON.stringify(tweet));
    TokenSessionStorage.addReplyTWeet(JSON.stringify(tweet));
    this.props.navigate("/reply");
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
        <div className="myTweetsContainer">
         
            {this.state.userTweet.length !== 0 ? (
              this.state.userTweet.reverse().map((postedTweet) => (
                <div key={postedTweet.id} className="myTweetsCard">
                  <div className="card-body">
                    <div className="tweetCardHeader">
                      <div className="loginIdText">@{postedTweet.loginId}</div>
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
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-md px-4 mt-1"
                        onClick={() => this.deleteClicked(postedTweet.id)}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="commentBtn px-4 mt-1"
                        onClick={() =>
                          this.editTweet({
                            tweetId: postedTweet.id,
                            tweet: postedTweet.userTweet,
                          })
                        }
                      >
                        Update
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
                </div>
              ))
            ) : (
              <div className="tweetsText">
                No tweets yet. Click on add tweet to post one.
              </div>
            )}
        
        </div>
      </div>
    );
  }
}
