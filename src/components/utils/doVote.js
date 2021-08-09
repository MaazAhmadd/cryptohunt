import axios from "axios";
import qs from "querystring";
import jwtDecode from "jwt-decode";
import config from "../../config.json";
const apiUrl = config.API_URL;

export default async (id) => {
  let token = localStorage.getItem("token");
  let user;

  axios.defaults.headers.common["x-auth-token"] = token;
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
