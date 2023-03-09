const db = require('./db/connect');
require('console.table');
const inquirer = require('inquirer');
const logo = require('asciiart-logo');

//loads my logo first on console 
loadLogo();
// function to give my logo properties.
function loadLogo() {
    console.log(
        logo({
            name: 'Company Database',
            font: 'Speed',
            logoColor: 'bold-blue',
        }).render())
    mainPrompts();
}
//load prompts
function mainPrompts() {
    inquirer.prompt([{
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
            {
                name: "View Departments",
                value: "VIEW_DEPARTMENTS"
            },
            {
                name: "View Employees",
                value: "VIEW_EMPLOYEES"
            },
            {
                name: "View Roles",
                value: "VIEW_ROLES"
            },
            {
                name: "Add Department",
                value: "ADD_DEPARTMENT"
            },
            {
                name: "Add Employee",
                value: "ADD_EMPLOYEE"
            },
            {
                name: "Add Role",
                value: "ADD_ROLE"
            },
            {
                name: "Update Employee",
                value: "UPDATE_EMPLOYEE"
            },
            {
                name: "Quit",
                value: "QUIT"
            }
        ]
    }]).then(res => {
        if (res.choice === "VIEW_DEPARTMENTS") {
            // call view department function here
            viewDepartments();
        }
        if (res.choice === "ADD_DEPARTMENT") {
            // call add department function here
            addDepartment();
        }
        if (res.choice === "VIEW_EMPLOYEES") {
            // call view employee function here
            viewEmployees();
        }
        if (res.choice === "ADD_EMPLOYEE") {
            // call add employee function here
            addEmployee();
        }
        if (res.choice === "UPDATE_EMPLOYEE") {
            // call update employee function here
            updateEmployee();
        }
        if (res.choice === "VIEW_ROLES") {
            // call view role function here
            viewRole();
        }
        if (res.choice === "ADD_ROLE") {
            // call add role function here
            addRole();
        }
        if (res.choice === "QUIT") {
            // call quit function here
            quit();
        }
    })
}
// View all departments choice in mainPrompts()
function viewDepartments() {
    db.promise().query('SELECT * FROM department')
        .then(([rows]) => {
            let departments = rows;
            console.table(departments);
        }).then(() => mainPrompts());
}
// Add department choice in mainPrompts()
function addDepartment() {
    inquirer.prompt([
        {
            name: 'dept_name',
            message: 'What is the new department?',
            type: 'input'
        }
    ]).then(res => {
        db.promise().query('INSERT INTO department (dept_name) values (?)', [res.dept_name])
            .then(data => {
                console.log('Department added successfully!')
            }).then(data => {
                db.promise().query('SELECT * FROM department')
                .then(([rows]) => {
                    let departments = rows;
                    console.table(departments);
            }).then(() => mainPrompts());
        })
    })
}
// View all employees choice in mainPrompts()
function viewEmployees() {
    db.promise().query('SELECT * FROM employee')
        .then(([rows]) => {
            let departments = rows;
            console.table(departments);
        }).then(() => mainPrompts());
}
// Add employee choice in mainPrompts()
function addEmployee() {
    inquirer.prompt([
        {
            name: 'first_name',
            message: 'What is the new employees first name?',
            type: 'input'
        },
        {
            name: 'last_name',
            message: 'What is the new employees last name?',
            type: 'input'
        }
    ]).then(res => {
        db.promise().query('SELECT * FROM role')
            .then(([data]) => {
                const roleChoices = data.map(({ role_title }) =>
                ({
                    name: role_title
                }));
                inquirer.prompt([
                    {
                        name: 'role_id',
                        message: 'What is the new employees role?',
                        type: 'list',
                        choices: roleChoices
                    }
                ]).then(res => {
                    // need to declare variable = res. so res is not undefined?
                    db.promise().query('SELECT * FROM employee WHERE manager_id IS NULL')
                        .then(([data]) => {
                            const manChoices = data.map(({ first_name, last_name, manager_id }) =>
                            ({
                                name: `${first_name} ${last_name}`,
                                value: manager_id
                            }));
                            // Give the user the option to not select a manager
                            manChoices.push({ name: "None", value: null });

                            inquirer.prompt([
                                {
                                    name: 'manager_id',
                                    message: "What is the new employees Manager name?",
                                    type: 'list',
                                    choices: manChoices
                                }
                            ]).then(res => {
                                db.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)', [res.first_name, res.last_name, res.role_id, res.manager_id])
                                    .then(data => {
                                        console.log('Employee added successfully!')
                                }).then(data => {
                                    db.promise().query('SELECT * FROM employee')
                                    .then(([rows]) => {
                                        let employees = rows;
                                        console.table(employees);
                                }).then(() => mainPrompts());
                            })
                        })
                    });
                });
            });
        });
    }

// Update employee choice in mainPrompts()
function updateEmployee() {
    db.promise().query('SELECT * FROM employee')
        .then(([data]) => {
            const empChoices = data.map(({ first_name, last_name, id }) =>
            ({
                name: `${first_name} ${last_name}`,
                value: id
            }));
            inquirer.prompt([
                {
                    name: 'employee',
                    message: "Choose which employee's role you would like to update?",
                    type: 'list',
                    choices: empChoices
                }
            ]).then(res => {
                db.promise().query('SELECT * FROM role')
                    .then(([data]) => {
                        const roleChoices = data.map(({ id, title }) =>
                        ({
                            name: title,
                            value: id
                        }));
                        inquirer.prompt([{
                            name: 'role_id',
                            message: 'Choose which role you would like to assign to the employee?',
                            type: 'list',
                            choices: roleChoices
                        }
                        ]).then(res => {
                            db.promise().query('SELECT * FROM employee WHERE manager_id IS NULL')
                            .then(([data]) => {
                            const manChoices = data.map(({ first_name, last_name, id }) =>
                            ({
                                name: `${first_name} ${last_name}`,
                                value: id
                            }));
                            // Give the user the option to not select a manager
                            manChoices.push({ name: "None", value: null });

                            inquirer.prompt([
                                {
                                    name: 'manager_id',
                                    message: 'Choose which manager you would like to update?',
                                    type: 'list',
                                    choices: manChoices
                                }
                            ]).then(res => {
                                db.query('UPDATE employee (employee, role_id, manager_id) values (?, ?, ?)', [res.employee, res.role_id, res.manager_id], function (err, data) {
                                    console.log('Employee update successful!')
                                    mainPrompts()
                                })
                            })
                        })
                    })
                })
            })
        })
}
// View all roles in mainPrompts()
function viewRole() {
    db.promise().query('SELECT * FROM role')
        .then(([rows]) => {
            let departments = rows;
            console.table(departments);
        }).then(() => mainPrompts());
}
// Add role choice in mainPrompts()
function addRole() {
    db.promise().query('SELECT * FROM department')
        .then(([data]) => {
            const deptChoices = data.map(({ id, name }) => ({
                name: name,
                value: id
            }));
            inquirer.prompt([
                {
                    name: 'role_title',
                    message: 'What is the name of the new role?',
                    type: 'input'
                },
                {
                    name: 'salary',
                    message: 'What is the salary of the new role?',
                    type: 'input'
                },
                {
                    name: 'dept_id',
                    message: 'Choose the new employees department?',
                    type: 'list',
                    choices: deptChoices
                }
            ]).then(res => {
                db.query('INSERT INTO role (role_title, salary, dept_id) values (?, ?, ?)', [res.role_title, res.salary, res.dept_id], function (err, data) {
                    console.log('Role added successfully!')
                    mainPrompts()
                })
            })
        })
};
// Exit the app at quit() in mainPrompts()
function quit() {
    console.log("Exiting Company Database!")
    process.exit();
}
