import axios from "axios";
import jwt_decode from "jwt-decode";
//13.233.167.0:9090
const TWEET_APP_ROOT_URI = "http://localhost:9090/api/v1.0/tweets";

export function loginUser(username, password) {
  return axios.post(TWEET_APP_ROOT_URI + "/login", {
    loginId: username,
    password: password,
  });
}

export function registerUser(
  firstName,
  lastName,
  email,
  loginId,
  password,
  confirmPassword,
  contactNumber,
  secretKey
) {
  return axios.post(TWEET_APP_ROOT_URI + "/register", {
    firstNameDto: firstName,
    lastNameDto: lastName,
    emailDto: email,
    loginIdDto: loginId,
    passwordDto: password,
    confirmPasswordDto: confirmPassword,
    contactNumberDto: contactNumber,
    secretKeyDto: secretKey,
  });
}

export function getUserDetail() {
  const token = sessionStorage.getItem("token");
  const decodeToken = jwt_decode(token);
  return axios.get(TWEET_APP_ROOT_URI + "/user/search/" + decodeToken.sub, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getAllTweets() {
  const token = sessionStorage.getItem("token");
  return axios.get(TWEET_APP_ROOT_URI + "/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getUserTweets() {
  const token = sessionStorage.getItem("token");
  const decodeToken = jwt_decode(token);
  return axios.get(TWEET_APP_ROOT_URI + "/" + decodeToken.sub, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getUserTweets1(username) {
  const token = sessionStorage.getItem("token");
  const decodeToken = jwt_decode(token);
  return axios.get(TWEET_APP_ROOT_URI + "/" + username, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function likeTweet(tweetId) {
  const token = sessionStorage.getItem("token");
  const decodeToken = jwt_decode(token);
  return axios.put(
    TWEET_APP_ROOT_URI + "/" + decodeToken.sub + "/like/" + tweetId,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function postTweet(userTweetId, tweet, tag) {
  const token = sessionStorage.getItem("token");
  const decodeToken = jwt_decode(token);
  return axios.post(
    TWEET_APP_ROOT_URI + "/" + decodeToken.sub + "/add",
    {
      userTweet: tweet,
      tag: tag,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function replyTweet(tweetId, reply) {
  const token = sessionStorage.getItem("token");
  const decodeToken = jwt_decode(token);
  return axios.post(
    TWEET_APP_ROOT_URI + "/" + decodeToken.sub + "/reply/" + tweetId,
    {
      tweetReply: reply,
      replyTag: "",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function deleteTweet(tweetId) {
  const token = sessionStorage.getItem("token");
  const decodeToken = jwt_decode(token);
  return axios.delete(
    TWEET_APP_ROOT_URI + "/" + decodeToken.sub + "/delete/" + tweetId,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function updateTweet(tweet, tag) {
  const token = sessionStorage.getItem("token");
  const decodeToken = jwt_decode(token);
  const updateTweet = JSON.parse(sessionStorage.getItem("updateTweet"));
  return axios.put(
    TWEET_APP_ROOT_URI +
      "/" +
      decodeToken.sub +
      "/update/" +
      updateTweet.tweetId,
    {
      tweet: tweet,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function getUserByUserName() {
  const token = sessionStorage.getItem("token");
  const userName = sessionStorage.getItem("userName");
  return axios.get(TWEET_APP_ROOT_URI + "/user/search/" + userName, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function forgetPassword(userName, changePassword, secret) {
  return axios.post(TWEET_APP_ROOT_URI + "/" + userName + "/forgot", {
    username: userName,
    newPassword: changePassword,
    secretKey: secret,
  });
}

export function allUsers() {
  const token = sessionStorage.getItem("token");
  return axios.get(TWEET_APP_ROOT_URI + "/users/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
