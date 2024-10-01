require('dotenv').config();

const express = require('express');
const app = express();
const mysql = require('mysql2');

const USERNAME = process.env.DB_USERNAME;
const HOST = process.env.DB_HOST;
const PASSWORD = process.env.DB_PASSWORD;
const database_name = process.env.DB_NAME;

const connection = mysql.createConnection({
		host: HOST,
		user: USERNAME,
		password: PASSWORD,
		database: database_name
});

// Question 1

app.get("/patients", function(req, res) {
	connection.connect((err)=>{
	if (err) {
		throw err;
	} else {
		//console.log("Successfully connected to Database!");
		connection.query("SELECT patient_id, first_name, last_name, date_of_birth FROM patients", (err, results, fields)=>{
		if (err) throw err;
		res.send({results});
		});
	  }
	});
});//end of '/patients' endpoint

// Question 2

app.get("/providers", function(req, res) {
	connection.connect((err)=>{
	if (err) {
		throw err;
	} else {
		// console.log("Successfully connected to Database!");
		connection.query("SELECT first_name, last_name, provider_specialty FROM providers", (err, results, fields)=>{
		if (err) throw err;
		res.send({results});
		});
	  }
	});
});//end of '/providers' endpoint

// Question 3

app.get("/name", function(req, res) {
	connection.connect((err)=>{
	if (err) {
		throw err;
	} else {
		// console.log("Successfully connected to Database!");
		var name = req.query.first_name;
		// console.log("first_name parameter: ", name);
		const Query = `SELECT * FROM patients WHERE first_name="${name}"`;
		connection.query(Query, (err, results, fields)=>{
		if (err) throw err;
		res.send({results});
		});
	  }
	});
});//end of 'filtered first_name' endpoint

// Question 4

app.get("/specialty", function(req, res) {
	connection.connect((err)=>{
	if (err) {
		throw err;
	} else {
		// console.log("Successfully connected to Database!");
		var Specialty = req.query.provider_specialty;
		// console.log("provider_specialty parameter: ", Specialty);
		const Query = `SELECT * FROM providers WHERE provider_specialty="${Specialty}"`;
		connection.query(Query, (err, results, fields)=>{
		if (err) throw err;
		res.send({results});
		});
	  }
	});
});//end of 'filtered specialty' endpoint


// listen to the server
const PORT = 3000;
app.listen(PORT, () => {
console.log(`server is running on http://localhost:${PORT}.`);
});
