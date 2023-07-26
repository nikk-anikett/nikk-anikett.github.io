const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'demo'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Endpoint to fetch data from the database based on the selected database
app.get('/getData', (req, res) => {
  const selectedDatabase = req.query.database;

  let sqlQuery = '';
  if (selectedDatabase === 'database1') {
    sqlQuery = 'SELECT * FROM Persons Where PersonID=101';
  } else if (selectedDatabase === 'database2') {
    sqlQuery = 'SELECT * FROM Persons Where PersonID=106';
  } else if (selectedDatabase === 'database3') {
    sqlQuery = 'SELECT * FROM Persons';
  } else {
    // return res.status(400).json({ error: 'Invalid query identifier' });
    // Default query (change this based on your needs)
    sqlQuery = 'SELECT * FROM Persons';
  }

  connection.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'An error occurred while fetching data' });
    }
    res.json(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
