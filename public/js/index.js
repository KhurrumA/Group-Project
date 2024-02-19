/* easlint-disable */
//console.log('Hello from parcel ');
import "@babel/polyfill";
import { login, logout, reviews } from "./login";
import { signup, enroll } from "./register";
//import "./course";//course.js

//DOM ELEMENTS
console.log("i am in index");
const loginForm = document.querySelector(".form--login");
const logoutBtn = document.querySelector(".nav__el--logout");
const signupForm = document.querySelector(".form--signup");
const enrollMe = document.querySelector(".enroll__btn");
const reviewForm = document.querySelector(".review-form");
//const finishbutton = document.querySelector(".nav__el-courses")//new

//CALLING COURSE.JS
//if (finishbutton) {//new
  //finishbutton.addEventListener("click", finishCourse);//new
//}

if (loginForm) {
  console.log("i am inside loginform");
  //the .form is the class that has been used in the loginForm.pug file
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); //prevent the form from loading any other elements on the page
    //VALUES
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  }); //quering on the form and the browser will fire off at 'submit' of the form
}

//LOGGING OUT THE USER
if (logoutBtn) logoutBtn.addEventListener("click", logout);

//REGISTERING THE USER
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const cpassword = document.getElementById("cpassword").value;
    signup(name, email, password, cpassword);
  });
}

//ENROLL USER INTO COURSE
if (enrollMe) {
  enrollMe.addEventListener("click", () => {
    const courseId = enrollButton.dataset.courseId;
    console.log(courseId); // Output: 5c88fa8cf4afda39709c2955
    enroll(courseId);
  });
}

// POST REVIEW
if (reviewForm) {
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const review = document.getElementById("review").value;
    const selectedRating = document.querySelector(
      'input[name="rate"]:checked'
    ).value;
    const courseId = submit.dataset.courseId;
    reviews(review, selectedRating, courseId);
    // Do something with the review data
  });
}
