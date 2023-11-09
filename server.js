// Import packages.
const inquirer = require('inquirer');
const mysql = require('mysql2'); 
const cFonts = require('cfonts');

// MySQL connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'company_db'
},
console.log('Connected to the company database!')
);

// ASCII font using NPM cfonts.
cFonts.say('Employee Manager', {
	font: 'block',
	align: 'left',              
	colors: ['green', 'whiteBright'],
	background: 'transparent',  
	letterSpacing: 1,           
	lineHeight: 1,              
	space: true,                
	maxLength: '0',             
	env: 'node'                 
});

const init = function () {
    inquirer.prompt({
        type: 'list',
        name: 'database',
        message: 'What would you like to do?',
        choice: ['View All Employees', 'Add Employee', 'Update Employee Job Title', 'View All Job Titles', 'Add Job Title', 'View All Departments', 'Add Department']
    })

}
