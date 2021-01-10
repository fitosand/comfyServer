const mongoose = require('mongoose');

const today = Date.now();

// const defaultDate = (new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(today));

//post model
const PostSchema = new mongoose.Schema({
    unit: {
        type: String,
        required: true,
    },
    issue: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    status: {
        type: String,
        default: 'broken'
    },
    date: {
        type: String,
        default: new Date().toLocaleString('en-US')
    }
    
});

//model('name','the schema exported')
module.exports = mongoose.model("Post", PostSchema);