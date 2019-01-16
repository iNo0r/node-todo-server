const { mongoose } = require('./db/mongoose')
const { ObjectID } = require('mongodb')
const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')


const { Todo } = require('./models/todo')
const { User } = require('./models/user')
const authentecate = require('./middleware/authenticate')


const _ = require('lodash')
var app = express()
var port = process.env.PORT || 3000;

app.use(bodyParser.json())

//                          todos get

app.get('/todos', (req, res) => {
    // console.log(req.body)
    // User.find().then(data =>{
    //     res.send({data})
    // })
    Todo.find().then(data => {
        res.send({ data })
    })
})
app.get('/todos/:id', (req, res) => {
    var id = req.params.id
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('id not valid')

    }
    Todo.findById(id).then(data => {
        if (!data) {
            return res.status(404).send('no data attached with the id ')
        }
        res.send(data)
    })

    console.log(req.params.id)
})

//                          todos post
app.post('/todos/', (req, res) => {

    Todo(req.body).save().then(doc => {
        res.send(doc)
    }).catch(err => {
        res.status(400).send(err)
    })
})

//                          todos delete
app.delete('/todos/:id', (req, res) => {
    console.log(req.params.id)
    Todo.findByIdAndDelete(req.params.id).then(doc => {
        console.log('the doc', doc)
    })
    Todo.find().then(doc => {
        res.send(doc)
    })

})

//                          todos update
app.put('/todos/:id', (req, res) => {
    var id = req.params.id
    console.log(req.body)
    Todo.findByIdAndUpdate(id, {
        $set: req.body
    }).then(() => {
        Todo.find().then(doc => {
            res.send(doc)
        })
    }).catch(err => {
        res.send(err)
    })
})
////                                          Users
///   get users 
app.get('/users', (req, res) => {

    User.find().then(doc => {
        res.send(doc)
    })


})

//        post user 
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password'])
    var user = new User(body)

    user.save().then(() => {
        return user.generateAuthToken()
    }).then((token) => {
        res.header('x-auth', token).send(user)
    }).catch(err => {
        res.send(err)
    })

})

//                 delteAll users 
app.delete('/users', (req, res) => {
    User.deleteMany().then(doc => {
        User.find().then(doc2 => {
            res.send(doc2)
        })
    }).catch(err => {

    })
})




//  access by token private route and
app.get('/users/me', authentecate, (req, res) => {
    res.send(req.user)



})
//              login and retuen auth token in header 
app.post('/users/login', (req, res) => {
    let { email, password } = req.body

    User.findByCredentials(email, password).then(user => {
        user.generateAuthToken().then(token => {
            res.header('x-auth', token).send(user)
        })
    }).catch(err => {
        res.send(err)
    })
})

//              logout by token and delte the token 
app.delete('/users/logout', authentecate, (req, res) => {


    req.user.removeToken(req.token).then(()=>{
        res.send(res.send(req.user))
    })
})

app.put('/users', (req, res) => {
    // var token = req.header('x-auth')



})

app.get('/testing', (req, res) => {
    var token = req.header('x-auth')
    User.update({
        $pull: {
            tokens: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzNiNGM3M2RlZjE5NDVlN2Y3ZTNmNTMiLCJhY2Nlc3MiOiJ0b2tlbiIsImlhdCI6MTU0NzU2NDAzN30.493IChIhmmlt8PLZPRDb8WRC9BavHKTrfA0AqsUOiPs'
            }
        }
    }).then(doc => {
        res.send(doc)
    })
})





app.listen(port, () => {
    console.log(`app is up on port ${port}`)
})