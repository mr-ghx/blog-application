const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully.");
});

const blogsRouter = require('./routes/blogs');
const usersRouter = require('./routes/user');

app.use('/blogs', blogsRouter);
app.use('/user', usersRouter);

app.listen(port, () => {
    console.log("Server is listening on port: " + port);
});