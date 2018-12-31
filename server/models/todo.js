const mongoose = require('mongoose')



var todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        trim: true //delte the white space in the begining and end 
    },
    completed: {
        type: Boolean,
        // default: false
    }
});
var Todo = mongoose.model('todo', todoSchema);

module.exports = {
    Todo
}