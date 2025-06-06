const mongoose = require("mongoose");
require("dotenv").config(); // Load from .env
mongoose.connect(process.env.MONGO_URL)
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    password: {
        type: String,
        required: true,
        minLenght:6
    },
    firstName:{
        type: String,
        required: true,
        trim:true,
        maxLenght:50
    },
    lastName:{
        type: String,
        required: true,
        trim:true,
        maxLenght:50
    },

    
});
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model("User", userSchema);
module.exports = {
    User,
    Account
};