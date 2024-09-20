const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const urlRoutes = require('./routes/urlRoutes');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up EJS if you are using views
app.set('view engine', 'ejs');

// Serve the homepage with a form (optional)
app.get('/', (req, res) => {
  res.render('index');
});

// Use routes
app.use('/', urlRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
