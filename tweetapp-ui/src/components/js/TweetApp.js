import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostTweetComponent from "./tweet/PostTweetComponent";
import LoginComponent from "./user/LoginComponent";
import RegisterComponent from "./user/RegisterComponent";
import withNavigation from "./../jsx/WithNavigation";
import ForgetPasswordComponent from "./user/ForgetPasswordComponent";
import "./../css/PageNotFoundComponent.css";
import DashboardComponent from "./DashboardComponent";
import UserProfileComponent from "./user/UserProfileComponent";
import ReplyComponent from "./tweet/ReplyComponent";
import LogoutComponent from "./user/LogoutComponent";
import MyTweetComponent from "./tweet/MyTweetComponent";
import ErrorComponent from "./ErrorComponent";
import EditTweetComponent from "./tweet/EditTweetComponent";
import SearchUserComponent from "./user/SearchUserComponent";
import FooterComponent from "./FooterComponent";
import AllUsersComponent from "./user/AllUsersComponent";

export default class TweetApp extends Component {
  render() {
    const LoginWithNavigation = withNavigation(LoginComponent);
    const DashBoardWithNavigation = withNavigation(DashboardComponent);
    const MyTweetWithNavigation = withNavigation(MyTweetComponent);
    const ReplyWithNavigation = withNavigation(ReplyComponent);
    const PostTweetWithNavigation = withNavigation(PostTweetComponent);
    const EditTweetWithNavigation = withNavigation(EditTweetComponent);
    const UserProfileWithNavigation = withNavigation(UserProfileComponent);
    const SearchProfileWithNavigation = withNavigation(SearchUserComponent);
    const RegisterComponentWithNavigation = withNavigation(RegisterComponent);
    const AllUsersComponentWithNavigation = withNavigation(AllUsersComponent);
    const ForgetPasswordComponentWithNavigation = withNavigation(
      ForgetPasswordComponent
    );
    return (
      <div className="TweetApp">
        <BrowserRouter>
          <>
            <Routes>
              <Route path="/login" element={<LoginWithNavigation />} />
              <Route
                path="/register"
                element={<RegisterComponentWithNavigation />}
              />
              <Route
                path="/forgotpassword"
                element={<ForgetPasswordComponentWithNavigation />}
              />
              <Route path="/posttweet" element={<PostTweetWithNavigation />} />
              <Route path="/dashboard" element={<DashBoardWithNavigation />} />
              <Route
                path="/userprofile"
                element={<UserProfileWithNavigation />}
              />
              <Route path="/reply" element={<ReplyWithNavigation />} />
              <Route path="*" element={<PageNotFoundComponent />} />
              <Route path="/logout" element={<LogoutComponent />} />
              <Route path="/mytweets" element={<MyTweetWithNavigation />} />
              <Route path="/error" element={<ErrorComponent />} />
              <Route path="/edit" element={<EditTweetWithNavigation />} />
              <Route
                path="/searchuser"
                element={<SearchProfileWithNavigation />}
              />
              <Route path="/" element={<LoginWithNavigation />} />
              <Route
                path="/allUsers"
                element={<AllUsersComponentWithNavigation />}
              />
            </Routes>
          </>
        </BrowserRouter>
      </div>
    );
  }
}

function PageNotFoundComponent() {
  return (
    <div className="PageNotFoundComponent">
      <div className="footer-tag">
        <h1>Page Not Found</h1>
      </div>
    </div>
  );
}
