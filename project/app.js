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




// ... (previous server code)

// Endpoint to fetch data from the database based on query identifier
app.get('/getData', (req, res) => {
  const queryIdentifier = req.query.query;

  let sqlQuery = '';
  if (queryIdentifier === 'query1') {
    sqlQuery = 'SELECT * FROM data_table WHERE condition1';
  } else if (queryIdentifier === 'query2') {
    sqlQuery = 'SELECT * FROM data_table WHERE condition2';
  } else if (queryIdentifier === 'query3') {
    sqlQuery = 'SELECT * FROM data_table WHERE condition3';
  } else {
    // Invalid query identifier
    return res.status(400).json({ error: 'Invalid query identifier' });
  }

  connection.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'An error occurred while fetching data' });
    }
    res.json(result);
  });
});

// ... (continue with the rest of the server code)




<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Data Table Webpage</title>
</head>
<body>
  <h1>Data Table Webpage</h1>
  <!-- Add buttons for multiple queries -->
  <button onclick="fetchData('query1')">Fetch Data 1</button>
  <button onclick="fetchData('query2')">Fetch Data 2</button>
  <button onclick="fetchData('query3')">Fetch Data 3</button>
  <!-- Add a table to display the data -->
  <table id="dataTable">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Age</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody id="tableBody"></tbody>
  </table>

  <script>
    // Function to update the table with fetched data
    function updateTable(data) {
      const tableBody = document.getElementById('tableBody');
      let tableHTML = '';
      data.forEach((row) => {
        tableHTML += `<tr>
                        <td>${row.id}</td>
                        <td>${row.name}</td>
                        <td>${row.age}</td>
                        <td>${row.email}</td>
                      </tr>`;
      });
      tableBody.innerHTML = tableHTML;
    }

    // Function to fetch data based on query identifier
    function fetchData(queryIdentifier) {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          updateTable(data);
        }
      };
      // Send the query identifier to the server
      xhr.open('GET', `/getData?query=${queryIdentifier}`, true);
      xhr.send();
    }

    // Initial fetch on page load (you can choose the default query)
    fetchData('query1');
  </script>
</body>
</html>




<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Data Table Webpage</title>
</head>
<body>
  <h1>Data Table Webpage</h1>
  <!-- Add a button to fetch data -->
  <button onclick="fetchData()">Fetch Data</button>
  <table id="dataTable">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Age</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody id="tableBody"></tbody>
  </table>

  <script>
    // Function to fetch data from the server using AJAX and update the table
    function updateTable(data) {
      const tableBody = document.getElementById('tableBody');
      let tableHTML = '';
      data.forEach((row) => {
        tableHTML += `<tr>
                        <td>${row.id}</td>
                        <td>${row.name}</td>
                        <td>${row.age}</td>
                        <td>${row.email}</td>
                      </tr>`;
      });
      tableBody.innerHTML = tableHTML;
    }

    // Function to fetch data when the button is clicked
    function fetchData() {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          updateTable(data);
        }
      };
      xhr.open('GET', '/getData', true);
      xhr.send();
    }

    // Initial fetch on page load
    fetchData();
  </script>
</body>
</html>
