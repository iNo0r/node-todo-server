var text = 'hello'
const {ObjectID} = require('mongodb')
var tester = new ObjectID
// console.log(tester)
// console.log(tester.toHexString())

const bcrypt = require('bcryptjs')

var passoword = 'mypass'
var saltValue ;

// bcrypt.genSalt(10,(err,salt)=>{
//     bcrypt.hash(passoword,salt).then(res=>{
//         console.log(res)
//     })
    
// })


var hashed1 = '$2a$10$J76ZfXHNmrPuQcp6q7WWuOnRL4DqfuncPdjaaNihqsoQnkUrRM7F6'
var hashed2 = '$$2a$10$Grknjpiv7x.z2t3FrMssleXiO4gEMqJt7H3KEjOc2hwL41G8d6RjK'

bcrypt.compare(passoword,hashed1).then(res=>{
    console.log(res)
})
// bcrypt.compare(passoword,hashed2).then(res=>{
//     console.log(res)
// })