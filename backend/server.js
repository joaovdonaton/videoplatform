const express = require('express');
const cors = require('cors');
const app = express();

//connect to mongodb
require('./db/connectDB')();

require('./routes/thumbnail');

//add middleware for cross origin resource sharing and JSON parsing
app.use(express.json());
app.use(cors());

app.use('/register', require('./routes/register'));
app.use('/authenticate', require('./routes/authenticate'));
app.use('/video', require('./routes/video'));
app.use('/thumbnail', require('./routes/thumbnail'));

app.listen(3001, () => console.log("Running server on port 3001"));