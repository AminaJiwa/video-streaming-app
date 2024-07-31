//const mongoose = require("mongoose");
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
            creditCard: {type: String, required: true},
            amountValue: {type: String, required: true},
}, {
    timestamps: true,
}
);

export const Payment = mongoose.model("Payment", paymentSchema);