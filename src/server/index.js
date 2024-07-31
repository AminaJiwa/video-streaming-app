import {mongodbURL, PORT} from "./config.js";
import userRoute from "./routes/userRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
//const express = require("express");
//const mongoose = require("mongoose");
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
//const bodyParser = require("body-parser");
//const cors = require("cors");

const app = express();

//Middleware to parse the JSON request body
app.use(bodyParser.json());
app.use(cors());

app.use("/users", userRoute);
app.use("/payments", paymentRoute);


mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("App connected to database");
    //server only runs if connection to database is successful
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  })




