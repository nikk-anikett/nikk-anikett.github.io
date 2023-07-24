const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'demo'
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Endpoint to fetch data from the database
app.get('/getData', (req, res) => {
  const sqlQuery = 'SELECT * FROM Persons';
  connection.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'An error occurred while fetching data' });
    }
    res.json(result);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
