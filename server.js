// Import packages.
const inquirer = require('inquirer');
const mysql = require('mysql2'); 
const cfonts = require('cfonts');

// MySQL connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'company_db'
},
console.log('Connected to the company database!')
);

// ASCII font using NPM cfonts.
cfonts.say('Employee Manager', {
	font: 'block',              // define the font face
	align: 'left',              // define text alignment
	colors: ['green', 'whiteBright'],         // define all colors
	background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
	letterSpacing: 1,           // define letter spacing
	lineHeight: 1,              // define the line height
	space: true,                // define if the output text should have empty lines on top and on the bottom
	maxLength: '0',             // define how many character can be on one line
	env: 'node'                 // define the environment cfonts is being executed in
});
