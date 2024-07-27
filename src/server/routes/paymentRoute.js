
import {Payment} from "../models/paymentModel.js";
import {User} from "../models/userModel.js";
const express = require("express");

const router = express.Router();

router.post('/', async (request, response) => {
    try {
      const { creditCard, amountValue } = request.body;
  
      // Validate data (check all required fields)
      //Check if data is not empty
      if ( !creditCard || !amountValue ) {
        return response.status(400).send({
          message: "Please send all required fields: card number and payment amount",
        });
      }

      //Check credit card number
      if (creditCard && !/^\d{16}$/.test(creditCard)){
        return response.status(400).send({
          message: "Invalid credit card format",
        });
      }

      //Check amount value
      if (amountValue && !/^\d{0,3}$/.test(amountValue)){
        return response.status(400).send({
          message: "Invalid payment amount",
        });
      }


      //Check if credit card number is associated with registered user
      const existingUser = await User.findOne({creditCard});
      if (!existingUser){
        return response.status(404).send({
          message: "Credit card number is not associated with an exisiting user",
        });
      }
  
      // Create a new payment document
      const newPayment = new Payment({
        creditCard: creditCard,
        amountValue: amountValue,
      });

      const payment = await Payment.create(newPayment);
  
      // Save the payment to the database
      await payment.save();
  
      response.status(201).json({ message: 'Payment created successfully!' });
    } catch (error) {
      console.error('Error creating payment:', error.message);
      response.status(500).json({message: error.message});
    }
  });

//Route for get all payments from database
router.get("/", async (request, response) => {
    try{
      const payments = await Payment.find({});
      return response.status(200).json(payments);
    }
    catch (error){
      console.error(error.message)
      response.status(500).json({message: error.message});
    }
});
  

export default router;