const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3002;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

connection.connect(function(err) {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
    startPrompt();
});

const startPrompt = () => {
    inquirer.prompt ([
      {
        type: 'list',
        name: 'choices', 
        message: 'What would you like to do?',
        choices: ['View all departments', 
                  'View all roles', 
                  'View all employees', 
                  'Add a department', 
                  'Add a role', 
                  'Add an employee', 
                  'Update an employee role',
                  'No Action']
      }
    ])
      .then((answers) => {
        const { choices } = answers; 
  
        if (choices === "View all departments") {
          viewDepartments();
        }
  
        if (choices === "View all roles") {
          viewRoles();
        }
  
        if (choices === "View all employees") {
          showEmployees();
        }
  
        if (choices === "Add a department") {
          addDepartment();
        }
  
        if (choices === "Add a role") {
          addRole();
        }
  
        if (choices === "Add an employee") {
          addEmployee();
        }
  
        if (choices === "Update an employee role") {
          updateEmployee();
        }
  
        if (choices === "No Action") {
          connection.end()
      };
    });
  };

 
// Function to view all departments
const viewDepartments = () => {
  console.log('Showing all departments...\n');
  const sql = `SELECT * FROM department`;
  connection.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database: ', err);
      return;
    }
    connection.query(sql, (err, rows) => {
      connection.release(); // Release the connection

      if (err) {
        console.error('Error executing the query: ', err);
        return;
      }

      console.table(rows); // Display the departments

      startPrompt();
    });
  });
};


// Function to view all roles
const viewRoles = () => {
  console.log('Showing all roles...\n');
  const sql = `SELECT * FROM role`;

  connection.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database: ', err);
      return;
    }

    connection.query(sql, (err, rows) => {
      connection.release(); // Release the connection

      if (err) {
        console.error('Error executing the query: ', err);
        return;
      }

      console.table(rows); // Display the roles

      // Continue with the program flow or perform any desired action

      startPrompt();
    });
  });
};