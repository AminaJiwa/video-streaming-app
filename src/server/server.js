const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
import {PORT} from "./config.js";

const app = express();

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  alert("Test")
});


//Middleware
app.use(cors());
app.use(bodyParser.json());

//Connect to mongodb, default port for mongodb is 27017
//username = aminajiwa1 password = INbk7GEw5nZNQ1ik
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://aminajiwa1:INbk7GEw5nZNQ1ik@cluster0.ykdo2f6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    console.log("Connection established")
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

mongoose.connect("mongodb://localhost:27017/video-streaming-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
            username: {type: String, required: true},
            password: {type: String, required: true},
            email: {type: String, required: true},
            birthDate: {type: Date, required: true},
            creditCard: {type: String, required: false},
})

const User = mongoose.model("User", userSchema);

app.post('/users', async (req, res) => {
    try {
      const { username, password, email, birthDate, creditCard } = req.body;
  
      // Validate data (e.g., check if username and email are unique)
  
      // Create a new user document
      const newUser = new User({
        username,
        password,
        email,
        birthDate,
        creditCard,
      });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });




