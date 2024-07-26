const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
            username: {type: String, required: true},
            password: {type: String, required: true},
            email: {type: String, required: true},
            birthDate: {type: Date, required: true},
            creditCard: {type: String, required: false},
}, {
    timestamps: true,
}
);

export const User = mongoose.model("User", userSchema);