const { mongoose } = require('./db/mongoose')

const express = require('express')
const bodyParser = require('body-parser')

const { Todo } = require('./models/todo')
const { User } = require('./models/user')

var app = express()
var port = process.env.PORT || 3000;
// app.get('/',(req,res)=>{
//     res.send('wtf')
// })

app.use(bodyParser.json())
app.post('/todos',(req,res)=>{
        console.log(req.body)
        new Todo(req.body).save().then(doc=>{
            res.send(doc)
        }).catch(err=>{
            res.status(400).send(err)
        })

        
})
app.listen(port,()=>{
    console.log(`app is up on port ${port}`)
})