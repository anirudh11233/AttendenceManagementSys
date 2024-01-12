const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://nithya3169:bcn8gMcHRRVqtW7E@clusteratms.ms3h1yl.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Mongodb connected app.js ...');
    }).catch(error => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Import and use the login route
const loginRoutes = require('./Routes/Login.Routes');
app.use('/login', loginRoutes);

const registerRoutes = require('./Routes/Register.Routes');
app.use('/register', registerRoutes);

//Redirect to the login route
app.get('/', (req, res) => {
    console.log('Redirecting to /login');
    res.redirect('/login');
});


app.listen(PORT, () => {
    console.log(`Server is running on app http://localhost:${PORT}`);
});




