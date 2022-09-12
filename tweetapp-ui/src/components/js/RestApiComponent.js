import axios from "axios";
import jwt_decode from "jwt-decode";

export function loginUser(username, password) {
  return axios.post("http://localhost:9090/api/v1.0/tweets/login", {
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
  roles,
  secretKey
) {
  return axios.post("http://localhost:9090/api/v1.0/tweets/register", {
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
  return axios.get(
    `http://localhost:9090/api/v1.0/tweets/user/search/${decodeToken.sub}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function getAllTweets() {
  const token = sessionStorage.getItem("token");
  return axios.get("http://localhost:9090/api/v1.0/tweets/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getUserTweets() {
  const token = sessionStorage.getItem("token");
  const decodeToken = jwt_decode(token);
  return axios.get(`http://localhost:9090/api/v1.0/tweets/${decodeToken.sub}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getUserTweets1(username) {
  const token = sessionStorage.getItem("token");
  const decodeToken = jwt_decode(token);
  return axios.get(`http://localhost:9090/api/v1.0/tweets/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function likeTweet(tweetId) {
  const token = sessionStorage.getItem("token");
  const decodeToken = jwt_decode(token);
  return axios.put(
    `http://localhost:9090/api/v1.0/tweets/${decodeToken.sub}/like/${tweetId}`,
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
    `http://localhost:9090/api/v1.0/tweets/${decodeToken.sub}/add`,
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
    `http://localhost:9090/api/v1.0/tweets/${decodeToken.sub}/reply/${tweetId}`,
    {
      tweetReply: reply,
      replyTag: "tag",
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
    `http://localhost:9090/api/v1.0/tweets/${decodeToken.sub}/delete/${tweetId}`,
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
    `http://localhost:9090/api/v1.0/tweets/${decodeToken.sub}/update/${updateTweet.tweetId}`,
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
  return axios.get(
    `http://localhost:9090/api/v1.0/tweets/user/search/${userName}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function forgetPassword(userName, changePassword, secret) {
  return axios.post(
    `http://localhost:9090/api/v1.0/tweets/${userName}/forgot`,
    {
      username: userName,
      newPassword: changePassword,
      secretKey: secret,
    }
  );
}

export function allUsers() {
  const token = sessionStorage.getItem("token");
  return axios.get(`http://localhost:9090/api/v1.0/tweets/users/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
