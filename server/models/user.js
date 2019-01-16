const mongoose = require('mongoose')
const validaror = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 2,
        trim: true, //delte the white space in the begining and end ,
        unique: true,
        validate: {
            validator: validaror.isEmail,
            message: 'email not valid'
        }

    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        },

    }]


});

UserSchema.methods.toJSON = function () {
    var user = this

    var userObject = user.toObject()

    return _.pick(userObject, ['_id', 'email'])

}

UserSchema.methods.generateAuthToken = function () {
    var user = this
    var access = 'token';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, 'anySatler')


    user.tokens.push({ access: access, token: token })

    return user.save().then(() => {
        return token
    })
}

UserSchema.methods.removeToken = function (token) {
    var user = this

    return user.update({
        $pull: {
            tokens: {
                token: token
            }
        }
    })
}


UserSchema.statics.findByToken = function (token) {
    var User = this
    var decoded;

    try {
        decoded = jwt.verify(token, 'anySatler')
        console.log(' it is verfired')
    }
    catch (e) {
        return Promise.reject()

    }
    console.log(decoded._id)
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'token'
    })

}

UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;

    return User.findOne({ email }).then(user => {
        if (!user) {
            return Promise.reject('user not registered')
        }
        return new Promise((resolove, reject) => {
            bcrypt.compare(password, user.password).then((isTrue) => {
                if (isTrue) {
                    resolove(user)
                }
                else {

                    reject('password is incorrect')
                }
            }).catch(() => {

            })
        })


    })

    console.log('hey credentials ')


}


UserSchema.pre('save', function (next) {
    var user = this

    if (user.isModified('password')) {
        bcrypt.genSalt(10).then(salt => {
            bcrypt.hash(this.password, salt).then(hashedpass => {
                user.password = hashedpass
                next();
            })
        })
    } else {
        next()
    }

})

var User = mongoose.model('User', UserSchema)


module.exports = {
    User
}

