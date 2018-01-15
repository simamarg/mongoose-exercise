// Mongoose Subdocs
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/postsDB');

var commentSchema = new mongoose.Schema({
    text: String,
    username: String
});

var postSchema = new mongoose.Schema({
    text: String,
    username: String,
    comments: [commentSchema]
});

var Post = mongoose.model('Post', postSchema);

// var aPost = new Post({ text: 'I am a post', username: 'Moshe', comments: [] });
// aPost.comments.push({ username: "Bob", text: "Great Post!" });

// aPost.save(function(err, data) {
//     if (err) { return console.error(err); }
//     console.log(data);
// });

//to retrieve a comment that has a specific _id from aPost and remove it - solution 1
Post.findById({ _id: '5a5c5277d23c020d6c50a58f' }, function (err, post) {
    if (err) throw err;
    for (let i=0; i < post.comments.length; i++) {
        if (post.comments[i].id === '5a5c5277d23c020d6c50a590') {
            post.comments.splice(i, 1);
            post.save(function(error, data) {
                if (err) { return console.error(error); }
                console.log(data);
            });
        }
    }
});

//to retrieve a comment that has a specific _id from aPost and remove it - solution 2
// Post.findById({ _id: '5a5c5277d23c020d6c50a58f' }, function (err, post) {
//     if (err) throw err;
//     post.comments.id('5a5c5277d23c020d6c50a590').remove();
//     post.save(function(error, data) {
//         if (err) { return console.error(error); }
//         console.log(data);
//     });
// });