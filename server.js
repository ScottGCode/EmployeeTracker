// Import packages.
const inquirer = require('inquirer');
const mysql = require('mysql2/promise'); 
const cFonts = require('cfonts');

// MySQL connection to database
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'company_db',
    port: 3306,
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

async function promptUser() {
    const response = await inquirer.prompt({
        type: 'list',
        name: 'database',
        message: 'What would you like to do?',
        choices: Object.keys(choices),
    });
        const selectedAction = choices[response.database];
        if (selectedAction) {
            await selectedAction();
            await promptUser();
        }else {
            console.log('Invalid choice');
        }
    }

async function viewAllEmployees() {
    try {
    const connection = await db;
    const [rows] = await connection.execute('SELECT * FROM employee');
        if (rows.length === 0) {
            console.log('No employees found.');
        }else {
            console.log('All Employees:');
            console.table(rows);
        }
    } catch(error) {
        console.error('Error querying the database:', error.message);
    };
}

async function addEmployee() {
    try {
    const connection = await db;

    const getRolesPromise = connection.query(`SELECT title as name, id as value FROM title`);
    const getEmployeesPromise = connection.query(`SELECT CONCAT(first_name,' ',last_name) as name, id as value FROM employee`);

    const [roles,employees] = await Promise.all([getRolesPromise, getEmployeesPromise]);
    const userInput = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: `What is the employee's first name?`
        },
        {
            type: 'input',
            name: 'last_name',
            message: `What is the employee's last name?`
        },
        {
            type: 'list',
            name: 'role_id',
            message: `What is the employee's role?`,
            choices: roles[0]
        },
        {
            type: 'list',
            name: 'manager_id',
            message: `Who is the employee's manager?`,
            choices: employees[0]
        },
    ]);
    
    await connection.query(`INSERT INTO employee SET ?`, userInput);
    console.log(`Employee: ${userInput.first_name} ${userInput.last_name} added!`);
} catch (error) {
    console.error('Error adding employee:', error.message);
}
};

async function updateEmployeeJobTitle() {
    try {
    const connection = await db;

    const [employeeResult] = await connection.query(`SELECT CONCAT(first_name, " ", last_name) as name, id as value FROM employee`);
    const [titlesResult] = await connection.query(`SELECT title as name, id as value FROM title`);
    
    const employeesAndRoles = employeeResult.map(employee => ({ name: employee.name, value: employee.value}));
    const titleChoices = titlesResult.map(title => ({ name: title.name, value: title.value}));

    const userInput = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Which employee\'s role do you want to update?',
            choices: employeesAndRoles,
        },
        {
            type: 'list',
            name: 'new_role_id',
            message: 'What role do you want to assign to the selected employee?',
            choices: titleChoices,
        }
    ]);

    await connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [userInput.new_role_id, userInput.employee_id]);
    console.log(`Employee's role updated!`);
} catch (error) {
    console.error('Error updating employee role:', error.message);
}
};

async function viewAllJobTitles() {
    try {
    const connection = await db;
    const [rows] = await connection.execute('SELECT * FROM title');
        if (rows.length === 0) {
            console.log('No titles found.');
        }else {
            console.log('All Titles');
            console.table(rows);
        }
    } catch(error) {
        console.error('Error querying the database', error.message);
    }
};

async function addJobTitle() {
    try {
    const connection = await db;

    const getDepartmentsPromise = connection.query(`SELECT department_name as name, id as value FROM department`);
    const [departments] = await Promise.all([getDepartmentsPromise]);
    const userInput = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Which department does the role belong in?',
            choices: departments[0]
        }
    ]);
    await connection.query('INSERT INTO title SET ?', userInput);
    console.log(`Job Title: ${userInput.title} added!`);
} catch (error) {
    console.error('Error adding job title:', error.message);
}
};

async function viewAllDepartments() {
    try  {
    const connection = await db;
    const [rows] = await connection.execute('SELECT * FROM department');
        if (rows.length === 0) {
            console.log('No departments found.');
        }else {
            console.log('All Departments');
            console.table(rows);
        }
    } catch(error) {
        console.error('Error querying the database', error.message);
    }
};

async function addDepartment() {
    try {
    const connection = await db;
    const userInput = await inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'What is the name of the department?'
        }
    ]);
    await connection.query('INSERT INTO department SET ?', userInput);
    console.log(`Department: ${userInput.department_name} added!`);
} catch (error) {
    console.error('Error adding department:', error.message);
}
};

promptUser(); 