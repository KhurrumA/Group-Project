import axios from "axios";
import { showAlert } from "./alerts";

// Function to search for a user by username
export const searchUserByUsername = async (username) => {
  console.log("I am in searchUserByUsername");
  try {
    console.log("Attempting to search for user");
    const res = await axios({
      method: "GET",
      url: `http://localhost:3000/v1/users/search/${username}`,
    });
    if (res.data.status === "success") {
      showAlert("success", "User found successfully");
      console.log("User Data:", res.data.data.user);
    }
  } catch (err) {
    showAlert("error", "User not found!");
  }
};

// Function to add a friend
export const addFriend = async (friendId) => {
  console.log("I am in addFriend");
  try {
    console.log("Attempting to add friend");
    const res = await axios({
      method: "PATCH",
      url: `http://localhost:3000/v1/users/addFriend/${friendId}`,
    });
    if (res.data.status === "success") {
      showAlert("success", "Friend added successfully");
      window.setTimeout(() => {
        location.reload(); // Reload the page to update the friend list
      }, 1000);
    }
  } catch (err) {
    showAlert("error", "Error adding friend!");
  }
};