const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(cors({ origin: 'http://localhost:3000'}));
app.use(express.json());

// links to database
const uri = process.env.URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection; 
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})

const destinationRouter = require('./routes/tickets');
app.use('/tickets', destinationRouter);

app.listen(3004, ()=> console.log('api listening on port 3004'));