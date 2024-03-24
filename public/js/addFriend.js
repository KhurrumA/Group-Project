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
      // Handle the user data as needed
      console.log("User Data:", res.data.data.user);
    }
  } catch (err) {
    showAlert("error", "User not found!");
  }
};