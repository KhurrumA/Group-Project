/* easlint-disable */
import axios from "axios";
import { showAlert } from "./alerts";

export const signup = async (name, email, password, cpassword) => {
  console.log("I am in register.js");
  try {
    console.log("i am inside catch");
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/v1/users/signup",
      data: {
        name,
        email,
        password,
        cpassword,
      },
    });
    if (res.data.status === "success") {
      showAlert("success", "Registration successful");
      window.setTimeout(() => {
        location.assign("/dashboard");
      }, 1500); //take 1.5 sec to load the home page
    }
  } catch (err) {
    showAlert("error", "Wrong email or password");
  }
};

//ENROLLING THE USER
export const enroll = async (courseId) => {
  console.log("I am in register.js");
  try {
    console.log("i am inside catch");
    const res = await axios({
      method: "POST",
      url: `http://localhost:3000/v1/users/enrollMe/${courseId}`,
    });
    if (res.data.status === "success") {
      console.log("Enrollment completed");
      window.setTimeout(() => {
        location.assign("/dashboard");
      }, 1500); //take 1.5 sec to load the home page
    }
  } catch (err) {
    window.setTimeout(() => {
      location.assign("/dashboard");
    }, 1500); //take 1.5 sec to load the home page
  }
};
