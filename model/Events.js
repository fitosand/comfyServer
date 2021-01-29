const mongoose = require('mongoose');

const today = Date.now();

// const defaultDate = (new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(today));

//post model
const EventsSchema = new mongoose.Schema({
    bldgName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    start:{
        type:String,
        required:true,
    },
    end: {
        type: String,
        required: true,
    },
    // postedBy: {
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'User'
    // },
    user: {
        type: String,
        default: 'unit 1B'
    },
    date: {
        type: String,
        default: new Date().toLocaleString('en-US')
    }
    
});

//model('name','the schema exported')
module.exports = mongoose.model("Events", EventsSchema);