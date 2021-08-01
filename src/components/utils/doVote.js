import axios from "axios";
import qs from "querystring";

export default async (id) => {
  const response = await axios.post(
    "http://localhost:8080/vote",
    qs.stringify({
      coin: id,
      user: localStorage.getItem("user_email"),
      status: "add",
    })
  );

  if (response.data.msg == "Already Upvoted!") {
    await axios.post(
      "http://localhost:8080/vote",
      qs.stringify({
        coin: id,
        user: localStorage.getItem("user_email"),
        status: "remove",
      })
    );
  }
};
