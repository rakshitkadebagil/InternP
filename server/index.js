const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors())
app.use(bodyParser.json());

const users = [];

app.post('/signup', (req, res) =>{
    const { username, email,number,password } = req.body;
    if(users.some(user => user.username === username)){
        return res.status(400).json({ message: 'username already exist'});
    }
    else{
        users.push({ username, email,number,password});
        return res.status(200).json({ message: 'User created successfully'});
    }

});

app.post('/login' , (req, res) =>{
    const { username, password } = req.body;
    if(users.some(user => user.username === username && user.password === password)){
        return res.status(200).json({ message: 'login successfully'});
    }
    else{
        return res.status(400).json({ message: 'Invalid username or password'});
    }
});

app.listen(9000 , () =>{
    console.log('server is running on port 9000');
});