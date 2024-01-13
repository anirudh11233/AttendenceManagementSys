const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const MONGO_URI = 'mongodb+srv://nithya3169:bcn8gMcHRRVqtW7E@clusteratms.ms3h1yl.mongodb.net/?retryWrites=true&w=majority'; 

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB database in Login');
});

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/verify', async (req, res) => {
    const { role, username, password } = req.body;

    if (!db) {
        console.error('Internal Server Error: MongoDB connection not established w Login');
        return res.status(500).send('Internal Server Error: MongoDB connection not established w Login');
    }

    try {
        if (typeof db.collection !== 'function') {
            console.error('Internal Server Error: db.collection is not a function');
            throw new Error('MongoDB connection error: db.collection is not a function');
        }

        const usersCollection1 = db.collection('teacher');
        const usersCollection2 = db.collection('student');
        const teacher = await usersCollection1.findOne({ teacher_email: username, teacher_password: password });
        const student = await usersCollection2.findOne({ student_email: username, student_password: password });
        

        if (teacher && role=="teacher") {
            res.redirect('/teacher');
        }
        else if (student && role=="student") {
            res.redirect('/student');
        } else {
            console.error('Authentication failed: Invalid username or password');
            res.status(401).json({ message: 'Invalid username or password.' });
        }
    } 
    catch (err) {
        console.error('Error during authentication:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/teacher', (req, res) => {
    res.send('Welcome to the Teacher Dashboard');
});
router.get('/student', (req, res) => {
    res.send('Welcome to the Student Dashboard');
});


module.exports = router;
