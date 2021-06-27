//import express : backend framework node js
const express = require("express");
const app = express();
//environment configuration
require("dotenv").config({ PATH: "./.env" });
// import mongoose: mongoDB library // ODM : obejct Data Modeling
const mongoose = require("mongoose");
//connect database
//user account // MONGO_URI -> .env file
//login:user
//password:user
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("db connected ..."))
  .catch((error) => console.log(error));
//parsing client data to json to let mongoose understand the req.body
app.use(express.json());
//Route
app.use("/user", require("./Routes/userRoutes"));
//PORT -> .env file
const PORT = process.env.PORT || 6000; // 5000 || 6000
// Listen to PORT if error display error else server is running
app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("server is running..." + PORT);
});
