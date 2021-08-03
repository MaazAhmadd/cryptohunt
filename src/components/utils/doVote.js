import axios from "axios";
import qs from "querystring";

export default async (id) => {
  await axios
    .post(
      "http://34.85.128.15:8080/vote",
      qs.stringify({
        coin: id,
        user: localStorage.getItem("user_email"),
        status: "add",
      })
    )
    .then(async (response) => {
      if (response.data.msg == "Already Upvoted!") {
        await axios.post(
          "http://34.85.128.15:8080/vote",
          qs.stringify({
            coin: id,
            user: localStorage.getItem("user_email"),
            status: "remove",
          })
        );
      }
    });
};
