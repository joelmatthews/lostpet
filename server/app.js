const mongoose = require('mongoose');
const express = require('express');
const req = require('express/lib/request');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

//Custom Errors
const { AppError } = require('./utilities/appError');

//routes
const lostPetRoutes = require('./routes/lostPetRoutes');
const authRoutes = require('./routes/authRoutes');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/lostpet', { connectTimeoutMS: 5000}).catch(e => console.log(e));

// Check if the connection was succesful
const db = mongoose.connection; 
db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once('open', () => {
    console.log('MongoDB Connected');
})

// Express application-level middleware
app.use(cors());
app.use(bodyParser.json());
app.use(mongoSanitize());

//Express Router Routes
app.use('/lostpets', lostPetRoutes);
app.use('/', authRoutes);



app.all('*', (req, res, next) => {
  next(new AppError('Not Found!', 404))
});

app.use((err, req, res, next) => {
  console.log(err);
  let { status } = err;
  // if (!status) {
  //   status = 404;
  // }
  res.status(status).json({ error: err}) 
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on ${port}`)
});

