const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");

//Error handling for uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down ...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
//CONNECTING TO ATLAS DB
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

//CONNECTING TO LOCAL DB
// mongoose
//   .connect(process.env.DATABASE_LOCAL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("DB connection successful"))
//   .catch((err) => console.error("DB connection error: ", err));

const port = 3000 || process.env.PORT;

const server = app.listen(3000, "localhost", () => {
  console.log(`Server is running on port ${port}`);
});

//Error handling for unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLES REJECTION! Shutting down...");
  server.close(() => {
    process.exit(1); //aboring all pending requests/promises
  });
});
