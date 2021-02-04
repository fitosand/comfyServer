const mongoose = require('mongoose');

const today = Date.now();

//post model
const SubsSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    }, 
    windClean: {
        type: Boolean, default: false 
    }, 
    carWash:  {
        type: Boolean, default: false 
    },
    oilPick:  {
        type: Boolean, default: false 
    },
    houseClean:  {
        type: Boolean, default: false 
    },
    washerIns:  {
        type: Boolean, default: false
     },
    dryerIns:  {
        type: Boolean, default: false 
    },
    date: {
        type: String,
        default: new Date().toLocaleString('en-US')
    }
    
});

//model('name','the schema exported')
module.exports = mongoose.model("Subs", SubsSchema);