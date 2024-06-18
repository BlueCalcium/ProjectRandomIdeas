const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = (process.env.PORT) ? process.env.PORT : 5000;
const connectDB = require('./config/db');

connectDB();

const app = express();

// Sets static folder to public
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware. Pretty much necessary in every Express project.
// .use() allows you to specify a middleware.
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

// CORS middleware.
// Note: Just writing 'app.use(cors());' allows you to make a request from anywhere. To have a specific whitelist, do it like this:
app.use(cors({
  origin: ['http://localhost:5000', 'http://localhost:3000'], // An array of whitelisted IPs.
  credentials: true
}))

// Note: res.send() automatically sets the content-type in the header to the type of data being sent. To send JSON data, you could actually just outright pass in the JS object to res.send().
// res.json() works very similarly to res.send(), except it only sends JSON. 

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the RandomIdeas API' });
});

const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));