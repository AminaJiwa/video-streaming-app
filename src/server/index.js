const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
import {mongodbURL, PORT} from "./config.js";
import {userModel} from "./models/userModel.js";

const app = express();

//Middleware to parse the JSON request body
// app.use(cors());
app.use(bodyParser.json());

app.post('/users', async (request, response) => {
    try {
      const { username, password, email, birthDate, creditCard } = request.body;
  
      // Validate data (check all required fields)
      //Check if data is not empty
      if ( !username || !password || !email || !birthDate ) {
        return response.status(400).send({
          message: "Please send all required fields: username, password, email, date of birth",
        });
      }

      //Check username is alphanumeric and no spaces using regex
      if (!/^[a-zA-Z0-9]+$/.test(username)){
        return response.status(400).send({
          message: "Invalid username format",
        });
      }

      //Check if username is already in use
      const existingUser = await User.findOne({username});
      if (existingUser){
        return response.status(409).send({
          message: "Username is already in use",
        });
      }

      //Check password format of min 8 length and 1 uppercase letter and number
      if (!/(?=.*[A-Z])(?=.*\d).{8,}/.test(password)){
        return response.status(400).send({
          message: "Invalid password format",
        });
      }

      //Check email format 
      if (!/\S+@\S+\.\S+/.test(email)){
        return response.status(400).send({
          message: "Invalid email format",
        });
      }

      //Check date of birth format (year, month, day)
      if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)){
        return response.status(400).send({
          message: "Invalid date of birth format ",
        });
      }

      //Check that user is over 18
      const todayDate = new Date().now;
      const userDate = new Date(birthDate);
      const age = todayDate.getFullYear - userDate.getFullYear
      if (age < 18){
        return response.status(403).send({
          message: "User is under 18 years of age",
        });
      }

      //Check credit card number
      if (creditCard && !/^\d{16}$/.test(creditCard)){
        return response.status(400).send({
          message: "Invalid credit card format",
        });
      }
  
      // Create a new user document
      const newUser = new User({
        username: username,
        password: password,
        email: email,
        birthDate: birthDate,
        creditCard: creditCard,
      });

      const user = await User.create(newUser);
  
      // Save the user to the database
      await newUser.save();
  
      response.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
      console.error('Error creating user:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });


app.get("/users", async (request, response) => {
    console.log(request);
    return response.status(201).send("User returned");
});
  

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

// //Connect to mongodb, default port for mongodb is 27017
// //username = aminajiwa1 password = INbk7GEw5nZNQ1ik
// const { MongoClient, ServerApiVersion } = require('mongodb');


// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(mongodbURL, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });


// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     console.log("Connection established")
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// // mongoose.connect("mongodb://localhost:27017/video-streaming-app", {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true
// // });







