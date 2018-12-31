const { MongoClient } = require('mongodb')

// MongoClient.connect('mongodb://localhost:27017/todoApp', (err, client) => {
//     if (err) {
//         return console.log(`unable to connect ${err}`)
//     }
//     console.log('connected to mongodb server')
//     const db = client.db('todoApp')
//     db.collection('todos').insertOne({
//         text: 'any',
//         compoleted: false
//     }, (err, result) => {
//         if (err) {
//             return console.log(err)
//         }
//         console.log(JSON.stringify(result.ops, undefined, 2))
//     })
//     client.close()
// })

MongoClient.connect('mongodb://localhost:27017/userstable', (err, client) => {
    const db = client.db('userstable')

    db.collection('users').insertOne({
        name: 'noure',
        nationality: 'turkish'
    }, (err, result) => {
        if (err) {
            return console.log("error with insertOne", err)
        }
        console.log(result.ops[0]._id.getTimestamp())
    })
    client.close()
})
