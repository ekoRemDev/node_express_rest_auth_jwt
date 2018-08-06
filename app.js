// Todo 1 - We'll use express
const express = require('express');
// Todo 5 - We'll use jsonwebtoken
const jwt = require('jsonwebtoken');
// Todo 2 - Create an instance of express
const app = express();


// Todo 4 - Create a Route for default
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.get('/api', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    //we added verifyToken moddleware function. We have to define that function
    jwt.verify(req.token, 'secretkeyuptoU', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post Creates',
                authData
            });
        }
    });
});


// Todo 6 - we have to login to use jwt
app.post('/api/login', (req, res) => {
    //User Data
    const user = {
        id: 1,
        username: 'user',
        email: 'user@gmail.com'
    };

    jwt.sign({user: user}, 'secretkeyuptoU', {expiresIn: '30s'}, (err, token) => {
        res.json({
            token
        });
    });

    // It gives us a token to verifyToken function that we'll use as a moddleware in posts route
});

//Format of TOKEN
// Authorization : Bearer <access_token>


// VerifyToken Function
function verifyToken(req, res, next) {
    // get the auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next moddleware
        next();
    } else {
        //Forbidden
        res.sendStatus(403);
    }
};


// Todo 3 - Create a server and run
app.listen(3000, (req, res) => {
    console.log('Server Runs');
});
