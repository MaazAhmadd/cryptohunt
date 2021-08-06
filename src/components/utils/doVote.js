import axios from "axios";
import qs from "querystring";
import jwtDecode from "jwt-decode";
import config from "../../config.json";
const apiUrl = config.API_URL;

axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

const user = jwtDecode(localStorage.getItem("token"));

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
