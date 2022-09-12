import moment from "moment";
import React, { Component, useEffect, useState } from "react";
import Card from "../../Card/Card";
import classes from "../../css/Tweet/CommentsComponent.module.css";

class CommentsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments,
      reply: "",
      user: 'JSON.parse(localStorage.getItem("user"))',
      error: "",
    };
  }

  //   onReplySubmit = () => {
  //     if (this.state.reply === "") {
  //       this.setState({ error: "Reply should not be empty" });
  //       return;
  //     } else if (Array.from(this.state.reply).length > 144) {
  //       this.setState({
  //         error: "Reply should not contains more than 144 characters",
  //       });
  //       return;
  //     }
  //     TweetAppService.replyToTweet(this.state.user.loginId, this.props.tweetId, {
  //       tweetReply: this.state.reply,
  //     }).then(window.location.reload());
  //   };

  render() {
    return (
      <div className={classes.tweetContainer}>
        {this.state.comments !== null &&
          this.state.comments.reverse().map((comment) => (
            <div className="tweet-card" key={comment.id}>
              <div className={classes.card}>
                <div className={classes.commentsCard}>
                  <div className={classes.tweetCardHeader}>
                    <div className={classes.loginIdText}>
                      @{comment.repliedBy}
                    </div>
                    <div className={classes.postedTimeText}>
                      {moment(comment.repliedOn).fromNow()}
                    </div>
                  </div>
                  <p className="card-text">{comment.userReply}</p>
                </div>
              </div>
            </div>
          ))}
      </div>

      // <div className={classes.reply}>
      //   <div className={classes.formGroup}>
      //     <div className={classes.errorText}>
      //       {this.state.error !== "" && this.state.error}
      //     </div>
      //     <input
      //       type="text"
      //       name="reply"
      //       id="reply"
      //       onChange={(e) => this.setState({ reply: e.target.value })}
      //       className={classes.inputClass}
      //       // className={
      //       //   errors.password !== undefined ? classes.inputError : ""
      //       // }
      //       autoComplete="off"
      //       // {...register("password", {
      //       //   required: "Password should not be empty",
      //       // })}
      //       placeholder="Add a reply"
      //     />
      //     <button
      //       type="submit"
      //       className={classes.replyBtn}
      //       onClick={() => this.onReplySubmit()}
      //     >
      //       Reply
      //     </button>

      //     {/* <p className={classes.loginErrorText}>
      //         {errors.password?.message}
      //         </p> */}
      //   </div>
      // </div>
    );
  }
}

export default CommentsComponent;
