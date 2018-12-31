const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/todoApp', (err, client) => {
    let db = client.db('todoApp')

    // db.collection('todos').find({ _id: new ObjectID('5c27b0ed9d5a900cdca87aa0') }).toArray().then(res => console.log(JSON.stringify(res, undefined, 2))).catch(err => console.log(err))
    db.collection('todos').find().count().then(count => console.log(`the count is :${count}`)).catch(err => console.log(err))

    client.close()
})