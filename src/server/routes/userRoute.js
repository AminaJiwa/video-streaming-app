const express = require("express");
import {User} from "./models/userModel.js";

const router = express.Router();

router.post('/', async (request, response) => {
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
      const todayDate = new Date();
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
      await user.save();
  
      response.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
      console.error('Error creating user:', error.message);
      response.status(500).json({message: error.message});
    }
  });

//Route for get all users from database
router.get("/", async (request, response) => {
    try{
      const users = await User.find({});
      return response.status(200).json(users);
    }
    catch (error){
      console.error(error.message)
      response.status(500).json({message: error.message});
    }
});
  
//Route for getting users who have/ don't have a credit card with filter
router.get("/filter", async (request, response) => {
  try{
    //Users must specify creditCard=Yes or creditCard=No in their request
    const {creditCard} = request.query;
    const filter = {};

    if (creditCard === "Yes"){
      filter.creditCard = { $exists: true };
    }
    else if (creditCard === "No"){
      filter.creditCard = { $exists: false };
    }

    const users = await User.find(filter);
    response.status(200).json(users);

  }
  catch (error){
    console.error(error.message)
    response.status(500).json({message: error.message});
  }
});

export default router;