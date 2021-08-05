import axios from "axios";
import qs from "querystring";
import config from "../../config.json";
const apiUrl = config.API_URL;

export default async (id) => {
  await axios
    .post(
      apiUrl + "/vote",
      qs.stringify({
        coin: id,
        user: localStorage.getItem("user_email"),
        status: "add",
      })
    )
    .then(async (response) => {
      if (response.data.msg == "Already Upvoted!") {
        await axios.post(
          apiUrl + "/vote",
          qs.stringify({
            coin: id,
            user: localStorage.getItem("user_email"),
            status: "remove",
          })
        );
      }
    });
};
