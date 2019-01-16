// const {SHA256}  = require('crypto-js')

// var text = 'hello'
// var hashed = SHA256(text).toString()
// var salting = hashed+ 'uniquetext'
// console.log(salting)


const jwt = require('jsonwebtoken')

var data = {
    text: 'anypass'
}

var token = jwt.sign(data,'1')
var tokenVerify = jwt.verify(token,'1')
