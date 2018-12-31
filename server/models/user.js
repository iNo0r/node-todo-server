const mongoose = require('mongoose')


var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 2,
        trim: true //delte the white space in the begining and end 
    },

});
var User = mongoose.model('User', UserSchema)


module.exports = {
    User
}

