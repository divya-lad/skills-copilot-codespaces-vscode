// Create web server

// Import the express module
const express = require('express');

// Import the path module
const path = require('path');

// Import the body-parser module
const bodyParser = require('body-parser');

// Create the express app
const app = express();

// Set the port
const port = 3000;

// Set the path to the views directory
app.set('views', path.join(__dirname, 'views'));

// Set the path to the static files
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Use the body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// Import the comments module
const comments = require('./comments');

// Set the default route
app.get('/', (req, res) => {
    // res.send('Hello world!');
    res.render('index', {
        title: 'Comments',
        comments: comments.getComments()
    });
});

// Set the route for adding a comment
app.post('/comment/add', (req, res) => {
    comments.addComment(req.body.name, req.body.comment);
    res.redirect('/');
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});