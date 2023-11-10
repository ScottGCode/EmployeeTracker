// Import packages.
const inquirer = require('inquirer');
const mysql = require('mysql2/promise'); 
const cFonts = require('cfonts');

// MySQL connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'company_db'
}).then ((connection) => {
    console.log('Connected to the company database!');
    return connection;
}).catch ((error) => {
    console.error('Error connecting to the database:', error.message)
    throw error;
});

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

const choices = {
    'View All Employees': viewAllEmployees,
    'Add Employee': addEmployee,
    'Update Employee Job Title': updateEmployeeJobTitle,
    'View All Job Titles': viewAllJobTitles,
    'Add Job Title': addJobTitle,
    'View All Departments': viewAllDepartments,
    'Add Department': addDepartment,
};

function promptUser() {
    inquirer.prompt({
        type: 'list',
        name: 'database',
        message: 'What would you like to do?',
        choices: Object.keys(choices),
    }).then(response => {
        const selectedAction = actions[response.database];
        if (selectedAction) {
            selectedAction();
        } else {
            console.log('Invalid choice');
        }
    });
}

async function viewAllEmployees() {
    const connection = awaid db;

}

async function addEmployee() {
    const connection = awaid db;

}

async function updateEmployeeJobTitle() {
    const connection = awaid db;

}

async function viewAllJobTitles() {
    const connection = awaid db;

}

async function addJobTitle() {
    const connection = awaid db;

}

async function viewAllDepartments() {
    const connection = awaid db;

}

async function addDepartment() {
    const connection = awaid db;

}

promptUser(); 