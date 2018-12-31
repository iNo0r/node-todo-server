var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/anytable')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('we are connected')
});


// module.exports = {mongoose}