/* easlint-disable */
//console.log('Hello from parcel ');
import "@babel/polyfill";
import { login, logout } from "./login";

//DOM ELEMENTS
console.log("i am in index");
const loginForm = document.querySelector(".form--login");
const logoutBtn = document.querySelector(".nav__el--logout");

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
