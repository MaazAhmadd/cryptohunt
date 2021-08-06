import axios from "axios";
import qs from "querystring";
import jwtDecode from "jwt-decode";
import config from "../../config.json";
import React from "react";
const apiUrl = config.API_URL;

export default async (id) => {
  let token;
  React.useEffect(() => {
    let myF = async () => {
      token = await localStorage.getItem("token");
    };
    myF();
  }, []);

  axios.defaults.headers.common["x-auth-token"] = token;
  let user;
  try {
    let dectoken = jwtDecode(token);
    user = dectoken;
  } catch (ex) {}

  await axios
    .post(
      apiUrl + "/vote",
      qs.stringify({
        coin: id,
        user: user.email,
        status: "add",
      })
    )
    .then(async (response) => {
      if (response.data.msg == "Already Upvoted!") {
        await axios.post(
          apiUrl + "/vote",
          qs.stringify({
            coin: id,
            user: user.email,
            status: "remove",
          })
        );
      }
    });
};
