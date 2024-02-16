/* easlint-disable */
import axios from "axios";
import { showAlert } from "./alerts";

export const login = async (email, password) => {
  console.log("I am in login.js");
  try {
    console.log("i am inside catch");
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/v1/users/login",
      data: {
        email,
        password,
      },
    });
    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully");
      window.setTimeout(() => {
        location.assign("/dashboard");
      }, 1500); //take 1.5 sec to load the home page
    }
  } catch (err) {
    const htmlContent = err.response.data;
    // Extract error message from HTML content
    const errorRegex = /Error:\s(.*?)<br>/;
    const match = htmlContent.match(errorRegex);
    if (match && match[1]) {
      const errorMessage = match[1];
      showAlert("error", errorMessage); // Pass the error message to showAlert
    } else {
      console.log("Error message not found in HTML content.");
    }
  }
};

//LOGGING OUT THE USER
export const logout = async () => {
  console.log("Logout button clicked"); // Add this log
  try {
    console.log("Before axios request"); // Add this log
    const res = await axios({
      method: "GET",
      url: "http://localhost:3000/v1/users/logout",
    });
    console.log("After axios request"); // Add this log
    if (res.data.status === "success") {
      console.log("Logout success"); // Add this log
      window.setTimeout(() => {
        location.assign("/");
      }, 1200);
    }
  } catch (err) {
    showAlert("error", "Error logging out! Try again.");
  }
};
