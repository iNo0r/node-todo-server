const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/todoApp', (err, client) => {
    let db = client.db('todoApp')

    // db.collection('todos').find({ _id: new ObjectID('5c27b0ed9d5a900cdca87aa0') }).toArray().then(res => console.log(JSON.stringify(res, undefined, 2))).catch(err => console.log(err))
    // db.collection('todos').find().count().then(count => console.log(`the count is :${count}`)).catch(err => console.log(err))
    // db.collection('todos').deleteMany({text:'do assignment1'}).then((res)=>{
    //     console.log(res.result)
    // })
    // db.collection('todos').deleteOne({text:'do assignment1'}).then((res)=>{
    //     console.log(res.result)
    // })
    // db.collection('todos').findOneAndDelete({ _id: new ObjectID("5c2888aea9f0b51a64137e3f") }).then((res) => {
    //     console.log(res)
    // })
    db.collection('todos').findOneAndUpdate({ _id: new ObjectID("5c27b0d99d5a900cdca87a98") },{
        $set: {
            text:'dont do dishers'
        },  
        $inc:{
            jobs:1
        }
    },{
        returnOriginal : false
    }).then(res=> console.log(res))
    client.close()
})
