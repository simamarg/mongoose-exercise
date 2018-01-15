// Mongoose Population
// 1. Mongoose requirements
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/booksDB');

// 2. Creating schemas
var Schema = mongoose.Schema;

var criticSchema = new Schema({
    name: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: 'review' }]
});

var bookSchema = new Schema({
    title: String,
    author: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: 'review' }]
});

var reviewSchema = new Schema({
    reviewText: String,
    book: { type: Schema.Types.ObjectId, ref: 'book' },
    critic: { type: Schema.Types.ObjectId, ref: 'critic' }
});

// 3. Creating models
var Review = mongoose.model('review', reviewSchema);
var Book = mongoose.model('book', bookSchema);
var Critic = mongoose.model('critic', criticSchema);

// 4. Creating instances and saving them
// var critic1 = new Critic({
//     name: "Moshe Critic",
//     reviews: []
// });

// var book1 = new Book({
//     title: "Hate Mongoose",
//     name: "Moshe Author",
//     reviews: []
// });

// var review1 = new Review({
//     reviewText: "I totally agree",
//     book: book1._id,
//     critic: critic1._id
// });

// review1.save();

// book1.reviews.push(review1);
// critic1.reviews.push(review1);

// book1.save();
// critic1.save();

// 5. Populating examples - populate one
// Book.findOne({ title: "Hate Mongoose" }).populate('reviews').exec(function(err, book) {
//     console.log(book);
// }); 

// Critic.findOne({ name: "Moshe Critic" }).populate('reviews').exec(function(err, critic) {
//     console.log(critic);
// });

// Book.findOne({ title: "Hate Mongoose" }).populate({
//     path: 'reviews',
//     populate: {
//         path: 'critic'
//     }
// }).exec(function (err, book) {
//     console.log(err);
//     console.log(book.reviews[0].critic);
// });

// Critic.findOne({ name: "Moshe Critic" }).populate({
//     path: 'reviews',
//     populate: {
//         path: 'book'
//     }
// }).exec(function (err, critic) {
//     console.log(err);
//     console.log(critic.reviews[0].book);
// });

// 5b. populate multiple
// Review.find({}).populate('critic book').exec(function (err, review) {
//     console.log(review[0]);
// });

// 5c. populate and console.log only the review text of the reviews
// Critic.findOne({ name: "Moshe Critic" }).populate('reviews', 'reviewText -_id').exec(function (err, critic) {
//     console.log(critic.reviews);
// });

// 5d. populate the properties of a single document using document.populate
// Critic.findOne({ name: "Moshe Critic" }, function (err, critic) {
//     //now we have a single critic
//     critic.populate('reviews', function () {
//         console.log(critic.reviews);
//     });
// });

// 5e. populate the properties of an array of documents using Model.populate
Critic.find(function (err, critics) {
    //now we have an array of critics
    Critic.populate(critics, { path: 'reviews' }, function (err, data) {
        //now data is an array of populated critics
        console.log(data);
    });
});