import { Component } from "react";

class UtilsSessionStorage extends Component {
  loginSuccessful(token) {
    sessionStorage.setItem("token", token);
  }

  logout() {
    let keysToRemove = [
      "token",
      "updateTweet",
      "userName",
      "replyTweet",
      "replyObj",
      "comments",
    ];
    keysToRemove.forEach((key) => sessionStorage.removeItem(key));
  }

  addreplyTweetId(id) {
    sessionStorage.setItem("replyingId", id);
  }

  addReplyTWeet(tweet) {
    sessionStorage.setItem("replyTweet", tweet);
  }

  removeReplyId() {
    sessionStorage.removeItem("replyingId");
  }

  addUpdateTweetStoreId(id) {
    sessionStorage.setItem("updateId", id);
  }

  removeUpdateTweetId(id) {
    sessionStorage.removeItem("updateId");
  }

  searchUser(userName) {
    sessionStorage.setItem("userName", userName);
  }

  updateTweet(tweet) {
    sessionStorage.setItem("updateTweet", tweet);
  }

  removeUpdateTweet() {
    sessionStorage.removeItem("updateTweet");
  }
}

export default new UtilsSessionStorage();
