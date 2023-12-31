const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3002;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected as Id" + connection.threadId);
  startPrompt();
});

const startPrompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "No Action",
        ],
      },
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
        viewEmployees();
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
        connection.end();
      }
    });
};

// Function to view all departments
const viewDepartments = () => {
  console.log("Showing all departments...\n");
  const sql = `SELECT * FROM department`;
    connection.query(sql, (err, rows) => {

      if (err) {
        console.error("Error executing the query: ", err);
        return;
      }

      console.table(rows);

      startPrompt();
    });
};

// Function to view all roles
const viewRoles = () => {
  console.log("Showing all roles...\n");
  const sql = `SELECT * FROM role`;
    connection.query(sql, (err, rows) => {

      if (err) {
        console.error("Error executing the query: ", err);
        return;
      }

      console.table(rows); 

      startPrompt();
    });
};

// Function to view all employees
const viewEmployees = () => {
  console.log("Showing all employees...\n");
  const sql = `SELECT * FROM employee`;

    connection.query(sql, (err, rows) => {

      if (err) {
        console.error("Error executing the query: ", err);
        return;
      }

      console.table(rows); 

      startPrompt();
    });
};


function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What Department would you like to add?",
      },
    ])
    .then(function (res) {
      var query = connection.query(
        "INSERT INTO department SET ? ",
        {
          name: res.name,
        },
        function (err) {
          if (err) throw err;
          console.table(res);
          startPrompt();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "role-name",
        type: "input",
        message: "What role would you like to add?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary?",
      },
    ])
    .then(function (res) {
      var query = connection.query(
        "INSERT INTO role SET ? ",
        {
          name: res.name,
          salary: res.salary
        },
        function (err) {
          if (err) throw err;
          console.table(res);
          startPrompt();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "first-name",
        type: "input",
        message: "What is the new employee's first name?",
      },
      {
        name: "last-name",
        type: "input",
        message: "What is their last name?",
      },
      {
        name: "role",
        type: "list",
        message: "What is their role?",
        choices: ["Engineering", "Finance", "Marketing", "IT"]
      },
    ])
    .then(function (res) {
      var query = connection.query(
        "INSERT INTO employee SET ? ",
        {
          first_name: res.name,
          last_name: res.lastName,
          role_id: parseInt(res.role_id),
          manager_id: null,
        },
        function (err) {
          if (err) throw err;
          console.table(res);
          startPrompt();
        }
      );
    });
}

// function to update employee
