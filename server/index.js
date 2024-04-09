const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://rakshit:rakshit123@cluster0.odirpxt.mongodb.net/', { 
  
 }).then(() => {
    console.log('Connected to MongoDB Atlas');
}
).catch((error) => {
    console.log('Error connecting to MongoDB Atlas');
});

// Define User schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    number: String,
    password: String
});

// Create User model
const User = mongoose.model('User', userSchema);

app.post('/signup', async (req, res) => {
    const { username, email, number, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    // Create new user
    const newUser = new User({ username, email, number, password });
    await newUser.save();
    return res.status(200).json({ message: 'User created successfully' });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Find user by username and password
    const user = await User.findOne({ username, password });
    if (user) {
        return res.status(200).json({ message: 'Login successful' });
    } else {
        return res.status(400).json({ message: 'Invalid username or password' });
    }
});

const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});