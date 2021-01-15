const mongoose = require('mongoose');


//user model
const userSchema = new mongoose.Schema({
    superUser:{
        type:Boolean,
        required: false,
        default:false
    },
    name: {
        type: String,
        required: false,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
    
});

//model('name','the schema exported')
module.exports = mongoose.model("User", userSchema)