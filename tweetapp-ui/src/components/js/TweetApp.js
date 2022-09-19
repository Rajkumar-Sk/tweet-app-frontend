import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostTweet from "./tweet/PostTweet";
import Login from "./tweetappuser/Login";
import UserRegistration from "./tweetappuser/UserRegistration";
import withNavigation from "./../jsx/WithNavigation";
import ForgotPassword from "./tweetappuser/ForgotPassword";
import Dashboard from "./Dashboard";
import Profile from "./tweetappuser/Profile";
import ReplyTweet from "./tweet/ReplyTweet";
import Logout from "./tweetappuser/Logout";
import MyTweets from "./tweet/MyTweets";
import Error from "./Error";
import UpdateTweet from "./tweet/UpdateTweet";
import SearchUser from "./tweetappuser/SearchUser";
import AllUsers from "./tweetappuser/AllUsers";
import Comments from "./tweet/Comments";

export default class TweetApp extends Component {
  render() {
    const LoginWithNavigation = withNavigation(Login);
    const DashBoardWithNavigation = withNavigation(Dashboard);
    const MyTweetsWithNavigation = withNavigation(MyTweets);
    const ReplyTweetWithNavigation = withNavigation(ReplyTweet);
    const PostTweetWithNavigation = withNavigation(PostTweet);
    const UpdateTweetWithNavigation = withNavigation(UpdateTweet);
    const ProfileWithNavigation = withNavigation(Profile);
    const SearchUserWithNavigation = withNavigation(SearchUser);
    const UserRegistrationWithNavigation = withNavigation(UserRegistration);
    const AllUsersWithNavigation = withNavigation(AllUsers);
    const ForgotPasswordWithNavigation = withNavigation(ForgotPassword);
    const CommentsWithNavigation = withNavigation(Comments);
    return (
      <div className="TweetApp">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginWithNavigation />} />
            <Route
              path="/register"
              element={<UserRegistrationWithNavigation />}
            />
            <Route
              path="/forgotpassword"
              element={<ForgotPasswordWithNavigation />}
            />
            <Route path="/posttweet" element={<PostTweetWithNavigation />} />
            <Route path="/dashboard" element={<DashBoardWithNavigation />} />
            <Route path="/userprofile" element={<ProfileWithNavigation />} />
            <Route path="/reply" element={<ReplyTweetWithNavigation />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/mytweets" element={<MyTweetsWithNavigation />} />
            <Route path="/error" element={<Error />} />
            <Route path="/edit" element={<UpdateTweetWithNavigation />} />
            <Route path="/searchuser" element={<SearchUserWithNavigation />} />
            <Route path="/" element={<LoginWithNavigation />} />
            <Route path="/allUsers" element={<AllUsersWithNavigation />} />
            <Route path="/comments" element={<CommentsWithNavigation />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
