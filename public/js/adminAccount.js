/* easlint-disable */
import axios from "axios";
import { showAlert } from "./alerts";

//tyoe is either password or data
export const deleteReviews = async (reviewId) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `http://localhost:3000/v1/reviews/${reviewId}`,
    });
    if (res.data.status === "success") {
      showAlert("success", "Review DELETED successfully");

      console.log("i am in delete review after success");
      window.setTimeout(() => {
        location.assign("/admin/comments");
      }, 500); //take 1.5 sec to load the home page
    }
  } catch (err) {
    console.log(err);
    showAlert("error", err.response.data.message);
  }
};
