// Intro to Mongoose Lesson
var mongoose = require('mongoose');

// Partner exercise 1
// mongoose.connect('mongodb://localhost/peopleDB');
// var Schema = mongoose.Schema;
// var personSchema = new Schema({
//     firstName: String,
//     lastName: String,
//     age: Number,
//     // address: addressSchema 
// });
// // var addressSchema = new Schema({
// //     city: String,
// //     street: String,
// //     apartment: Number
// // });
// var Person = mongoose.model('Person', personSchema);
// var david = new Person({ firstName: "David", lastName: "Smith", age: 25 });
// console.log(david);
// david.save();


// Partner exercise 2
// mongoose.connect('mongodb://localhost/beersDB');
// var Schema = mongoose.Schema;
// var beerSchema = new Schema({
//     name: String,
//     abv: Number,
//     style: String
// });
// var Beer = mongoose.model('Beer', beerSchema);
// var kasteelRouge = new Beer({ name: "Kasteel Rouge", abv: 8, style: "fruit beer" });
// kasteelRouge.save();


// Partner exercise 3 + 4
// mongoose.connect('mongodb://localhost/peopleDB');
// var Schema = mongoose.Schema;
// var personSchema = new Schema({
//     firstName: {type: String, required: true},
//     lastName: String,
//     age: {
//         type: Number,
//         min: 10
//     }
// });
// var Person = mongoose.model('Person', personSchema);

// Person.find(function (error, result) {
//     if (error) { 
//         return console.error(error);
//     }
//     console.log(result);
// });

// var moshe = new Person({ firstName: "Moshe", lastName: "Moses", age: 100 });
// var mitzi = new Person({ firstName: "Mitzi", lastName: "Miau", age: 5 });
// moshe.save();
// mitzi.save();

// var bob = new Person({lastName: "Cohen", age: 30});
// bob.save(function(err, result){
//     if (err) {
//         return console.error(err);
//     }
//     console.log(result);
// });

// Person.find({ age: 25 }, function (err, result) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log(result);
// });

// var danny = new Person({ firstName: "Danny", lastName: "Din", age:3 });
// danny.save(function(err, result){
//     if (err) {
//         return console.error(err);
//     }
//     console.log(result);
// });


// CRUD
mongoose.connect('mongodb://localhost/peopleDB');
var Schema = mongoose.Schema;

var personSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: String,
    age: {
        type: Number,
        min: 10
    },
    created_at: Date,
    updated_at: Date
});

personSchema.pre('save', function (next) {
    var currentDate = new Date(); // get the current date
    // change the updated_at field to current date
    this.updated_at = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.created_at) { this.created_at = currentDate; }
    next();
});
var Person = mongoose.model('Person', personSchema);

// var danny = new Person({ firstName: "Danny", lastName: "Din", age: 30 });
// danny.save(function (err, result) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log(result);
// });

// Person.findById(1, function (err, person) {
//     if (err) throw err;
//     console.log(person);
// });

// Person.findOneAndUpdate({ age: 25 }, { firstName: 'Ringo' }, { new: true }, function (err, person) {
//     if (err) throw err;
//     else console.log(person);
// });

Person.remove({ firstName: 'Ringo' }, function (err) {
    if (err) throw err;
    // we have deleted the person
    console.log('Person deleted!');
});