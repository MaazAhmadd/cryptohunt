import axios from "axios";
import qs from "querystring";
import jwtDecode from "jwt-decode";
import config from "../../config.json";
const apiUrl = config.API_URL;

export default async (id, status) => {
  axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

  if (status === "vote") {
    await axios
      .post(
        apiUrl + "/vote",
        qs.stringify({
          coin: id,
        })
      )
      .then(() => {
        window.location = "/";
      });
  } else if (status === "unvote") {
    await axios
      .post(
        apiUrl + "/unvote",
        qs.stringify({
          coin: id,
        })
      )
      .then(() => {
        window.location = "/";
      });
  }
};
