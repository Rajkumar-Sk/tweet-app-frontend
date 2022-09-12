import moment from "moment";
import React, { Component } from "react";
import "../../bootstrap.css";
import "../css/DashBoard.css";
import { getAllTweets, likeTweet } from "./RestApiComponent";
import TokenSessionStorage from "./TokenSessionStorage.js";
import CommentsComponent from "./tweet/CommentsComponent";

export default class DashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweet: {
        loginId: "",
        userTweet: "",
        postedOn: "",
      },
      tweets: [],
      comments: [],
      userName: "",
      noTweetsFound: false,
      lockedTweetId: "",
      replyTweet: {
        tweetId: "",
        tweet: "",
      },
    };
    this.likeClicked = this.likeClicked.bind(this);
    this.logoutClick = this.logoutClick.bind(this);
    this.profileView = this.profileView.bind(this);
    this.myTweetView = this.myTweetView.bind(this);
    this.replyClicked = this.replyClicked.bind(this);
    this.addTweet = this.addTweet.bind(this);
    this.searchClicked = this.searchClicked.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
    this.commentsHandler = this.commentsHandler.bind(this);
    this.allUsers = this.allUsers.bind(this);
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
      TokenSessionStorage.searchUser(this.state.userName);
      this.props.navigate("/searchuser");
    }
  }

  componentDidMount() {
    getAllTweets().then(
      (response) => {
        this.setState({ tweets: response.data });
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
  }

  likeClicked(id) {
    likeTweet(id).then(
      (response) => {
        if (response.status === 200) {
          this.componentDidMount();
        }
      },
      (error) => {
        if (error.status === 401) {
          TokenSessionStorage.logout();
          this.props.navigate("/logout");
        }
        if (error.status === 400) {
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
  }
  addTweet() {
    this.props.navigate("/posttweet");
  }
  replyClicked(tweet) {
    //console.log(JSON.stringify(tweet));
    TokenSessionStorage.addReplyTWeet(JSON.stringify(tweet));
    this.props.navigate("/reply");
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
              onChange={this.handleEventChange}
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

        <div className="dashboardContainer">
          {this.state.tweets.reverse().map((postedTweet) => (
            <div key={postedTweet.id} className="dashboardTweetCard">
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
                {/* <div className="reply-block">
                      {postedTweet.replies &&
                        postedTweet.replies.map((postedReply) => (
                          <div key={postedReply.repliedOn}>
                            <div className="card-body">
                              <p className="card-text">
                                {postedReply.userReply}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div> */}
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
          ))}
        </div>
      </div>
    );
  }
}
