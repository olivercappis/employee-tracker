const express = require('express');
const { Pool } = require('pg')
const inquirer = require('inquirer')

const PORT = 3001;

const app = express();



// Middleware for parsing application/json and urlencoded data
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const pool = new Pool(
    {
        // Enter PostgreSQL username
        user: 'postgres',
        // Enter PostgreSQL password
        password: 'keeper',
        host: 'localhost',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db database!')
)

pool.connect()

function run() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "choice",
                choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"]
            }
        ])
        .then((response) => {
            if (response.choice === 'View All Departments') {
                pool.query('SELECT id AS dept_id, name AS dept_name FROM department', function (err, res) { console.table(res.rows); run() })
            } else if (response.choice === 'View All Roles') {
                pool.query('SELECT * FROM role', function (err, res) { console.table(res.rows); run() })
            } else if (response.choice === 'View All Employees') {
                pool.query('SELECT * FROM employee', function (err, res) { console.table(res.rows); run() })
            } else if (response.choice === 'Add Department') {
                inquirer
                    .prompt([
                        {
                            message: 'What is the name of the department',
                            name: 'departmentName'
                        }
                    ])
                    .then((response) => {
                        pool.query('INSERT INTO department(name) VALUES($1)', [response.departmentName], (err, res) => {
                            if (err) {
                                console.log(err)
                                run()
                            } else {
                                console.table('Added new department')
                                run()
                            }
                        })
                    })

            } else if (response.choice === 'Add Role') {
                inquirer
                    .prompt([
                        {
                            message: 'What is the title of the role',
                            name: 'roleName'
                        },
                        {
                            message: 'What is the salary of the role',
                            name: 'roleSalary'
                        },
                        {
                            message: 'What is the department the role is In',
                            name: 'roleDept'
                        }
                    ])
                    .then((response) => {
                        pool.query('INSERT INTO role(title, salary, department) VALUES($1, $2, $3)', [response.roleName, response.roleSalary, response.roleDept],
                            (err, res) => {
                                if (err) {
                                    console.log(err)
                                    run()
                                } else {
                                    console.log('Added new role')
                                    run()
                                }
                            })
                    })
            } else if (response.choice === "Add Employee") {
                inquirer
                    .prompt([
                        {
                            message: "what is the employee's first name",
                            name: 'firstName'
                        },
                        {
                            message: "what is the employee's last name",
                            name: 'lastName'
                        },
                        {
                            message: 'what is the employees role ID',
                            name: 'role'
                        },
                        {
                            message: 'who is the employees manager (ID, optional)',
                            name: 'manager'
                        }
                    ])
                    .then((response) => {
                        pool.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES($1, $2, $3, $4)', [response.firstName, response.lastName, response.role, response.manager],
                            (err, res) => {
                                if (err) {
                                    console.log(err)
                                    run()
                                } else {
                                    console.log('Added new employee')
                                    run()
                                }
                            })
                    })

            } else {
                inquirer
                    .prompt([
                        {
                            message: 'what is the ID of the employee whos role you are updating',
                            name: 'id'
                        },
                        {
                            message: 'what is the employees new role ID',
                            name: 'newRole'
                        }
                    ])
                    .then((response) => {

                        pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [response.newRole, response.id], (err, res) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log('updated employee role')
                                run()
                            }
                        })
                    })
            }

        }

        );
}



run()








app.listen(PORT, () =>
    // console.log(`Express server listening on port ${PORT}!`)
    console.log('')
);
