import axios from "axios";
import qs from "querystring";
import jwtDecode from "jwt-decode";
import config from "../../config.json";
const apiUrl = config.API_URL;

axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
let user;
try {
  let dectoken = jwtDecode(localStorage.getItem("token"));
  user = dectoken;
} catch (ex) {}

export default async (id) => {
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
