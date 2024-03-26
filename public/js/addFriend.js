import axios from "axios";
import { showAlert } from "./alerts";

// Function to add a friend
export const addFriend = async (friendId) => {
  console.log("I am in addFriend");
  try {
    console.log("Attempting to add friend");
    const res = await axios({
      method: "PATCH",
      url: `http://localhost:3000/v1/users/addFriend/${friendId}`,
    });
    console.log(res);
    console.log(" i am above if");
    if (res.data.status === "success") {
      console.log("i am in if");
      showAlert("success", "Friend added successfully");
      window.setTimeout(() => {
        location.assign("/user/addFriend");
      }, 5000);
    }
  } catch (err) {
    showAlert("error", "Error adding friend!");
  }
};
