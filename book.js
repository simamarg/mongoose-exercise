// Mongoose Sub-docs
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/booksDB');

var authorSchema = new mongoose.Schema({
    name: String,
    DOB: Date,
    height: Number
});

var bookSchema = new mongoose.Schema({
    numberOfPages: Number,
    author: authorSchema
});

var Book = mongoose.model('book', bookSchema);

Book.create({
    numberOfPages: 22,
    author: {
        name: "Joe",
        height: 156
    }
}, function (err, data) {
    if (err) {
        return console.error(err)
    }
    console.log(data)
});