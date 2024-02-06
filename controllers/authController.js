const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const appError = require("./../utils/appError");
const jwt = require("jsonwebtoken");
const {promisify} = require ("util");

//SIGNUP TOKEN
/*
1)Get the token from the config file
2) Use the .sign() on jwt and set the expire time to the one in the config file
*/

const signUpJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

//CREATE JWT TOKEN
/*
1) Get the signup token
2) Define the cookie for jwt
3) Send the cookie back with the token to the cookie function on the res
4) Send back the 
*/

const createJWT = (user, statusCode, res) => {
  const jwtToken = signUpJwtToken(user._id); //_id is unique for each user

  // Parse the JWT_EXPIRY value to extract the number of days
  const expiryDays = parseInt(process.env.JWT_EXPIRY);

  // Calculate the expiry time in milliseconds based on JWT_EXPIRY in days
  const expiryTime = expiryDays * 24 * 60 * 60 * 1000;

  const cookieJwt = {
    expires: new Date(Date.now() + expiryTime), // Set expiry time
    httpOnly: true, // Cannot be modified
  };

  res.cookie("jwt", jwtToken, cookieJwt);

  user.password = undefined; //setting the password to undefined so that it does not get printed in the output

  res.status(statusCode).json({
    status: "success",
    jwtToken, //sending back the json token
    data: {
      user, //sending back the user data wihtout the password for security purpose
    },
  });
};

//SIGNUP
//1)Create a varible and set the newUser data
//2)Create and send the jwt to the user
//3) Add app.use(express.json({ limit: "10kb" })); in app.js

exports.registerUser = catchAsync(async (req, res, next) => {
  //console.log(req.body);
  const regUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
  });

  //sending the jwt token for the new user
  //
  createJWT(regUser, 201, res);
});

//LOGIN
/*
Get the email password
1) Check if the email and password exists
2) Check if the user exists and if the password is correct
3) If it is okay send back the jwt token
*/

exports.login = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body; //using the desctructring

  //if there is no email or password --> return error
  //It takes as first argument a string (error message)
  //second argument is the staust code 400 -> bad request
  //1)
  if (!email || !password) {
    return next(appError("Please provide email and password!", 400));
  }
  //Getting the user that has the email specified by the user
  const user = await User.findOne({ email }).select("+password");
  //2)
  // console.log(user);
  // console.log(await user.correctPassword("test", "test"));
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new appError("Incorrect email or password!", 401)); //401 means unauthorized
  } else {
    console.log("you are logged");
  }

  //3
  createJWT(user, 200, res);
});

//LOGOUT
/*
This is done before setting the cookie to null or not a random value
1) Get the cookie
2) Set an expiry
3) Send back the response: cookie and the status code
*/

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expiresIn: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.protect = catchAsync(async (req, res, next) => {
  //1)Get the token and check if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new appError("You are not logged in! Please login to get access", 401)
    );
  }

  //2)Validate the token - Verification stage verify if the data has been manipulated or expired
  const decoded = await promisify(jwt.verify)(token, process.env.JWT);

  //3) Check if the user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new appError("The user belonging to this token no longer exists", 401)
    );
  }

  //Grant access to the protected route
  req.user = freshUser;
  res.locals.user = freshUser;
  next();
});
