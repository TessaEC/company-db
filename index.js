const db = require('./db/connect')
require('console.table')

//load prompts
function mainPrompts() {
    prompt([{
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
    db.query('SELECT * FROM departments', function (err, data) {
        console.table(data)
        mainPrompts()
    })
}
// Add department choice in mainPrompts()
function addDepartment() {
    prompt([
        {
            name: 'dept_name',
            message: 'What is the new department?',
            type: 'input'
        }
    ]).then(res => {
        db.query('INSERT INTO departments (dept_name) values (?)', [res.dept_name], function (err, data) {
            console.log('Department added successfully!')
            mainPrompts()
        })
    })
}
// View all employees choice in mainPrompts()
function viewEmployees() {
    db.query('SELECT * FROM employees', function (err, data) {
        console.table(data)
        mainPrompts()
    });
}
// Add employee choice in mainPrompts()
// function addEmployee() {
//     db.promise().query('SELECT * FROM employees')
//         .then(([data]) => {
//             const manChoices = data.map(({ id, name }) => ({
//                 name: name,
//                 value: id
//             }));
//             const roleChoices = data.map(({ id, title }) => ({
//                 name: title,
//                 value: id
//             }));
//             prompt([
//                 {
//                     name: 'first_name',
//                     message: 'What is the new employees first name?',
//                     type: 'input'
//                 },
//                 {
//                     name: 'last_name',
//                     message: 'What is the new employees last name?',
//                     type: 'input'
//                 },
//                 {
//                     name: 'role_title',
//                     message: 'What is the new employees role?',
//                     type: 'list',
//                     choices: roleChoices
//                 },
//                 {
//                     name: 'manager_id',
//                     message: "What is the new employees Manager name?",
//                     type: 'list',
//                     choices: manChoices
//                 }
//             ]).then(res => {
//                 db.query('REPLACE employee (first_name, last_name, role_title, manager_id) values (?, ?, ?, ?)', [res.first_name, res.last_name, res.role, res.manager_id], function (err, data) {
//                     console.log('Employee added successfully!')
//                     mainPrompts()
//                 });
//             });
//         });
// }
function addEmployee() {
    prompt([
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
                const roleChoices = data.map(({ id, title }) =>
                ({
                    name: title,
                    value: id
                }));
                prompt([
                    {
                        name: 'role_title',
                        message: 'What is the new employees role?',
                        type: 'list',
                        choices: roleChoices
                    }
                ]).then(res => {
                    db.promise().query('SELECT * FROM employees')
                        .then(([data]) => {
                            const manChoices = data.map(({ first_name, last_name, manager_id }) =>
                            ({
                                name: `${first_name} ${last_name}`,
                                value: manager_id
                            }));

                            manChoices.push({ name: "None", value: null });
                            
                            prompt([
                                {
                                    name: 'manager_id',
                                    message: "What is the new employees Manager name?",
                                    type: 'list',
                                    choices: manChoices
                                }
                            ]).then(res => {
                                db.query('UPDATE employee (first_name, last_name, role_title, manager_id) values (?, ?, ?, ?)', [res.first_name, res.last_name, res.role, res.manager_id], function (err, data) {
                                    console.log('Employee added successfully!')
                                    mainPrompts()
                                });
                            });
                        });
                });
            });
    });
}

// Update employee choice in mainPrompts()
// function updateEmployee() {
//     prompt([
//         {
//             name: 'employee',
//             message: "Choose which employee's role you would like to update?",
//             type: 'list',
//             choices:
//         },
//         {
//             name: 'role_id',
//             message: 'Choose which role you would like to assign to the employee?',
//             type: 'list',
//             choices:
//         }
//         {
//             name: 'manager_id',
//             message: 'Choose which manager you would like to update?',
//             type: 'list',
//             choices:
//         }
//     ]).then(res => {
//         db.promise().query('UPDATE employees (employee, role_id, manager_id) values (?, ?, ?)', [res.employee, res.role_id, res.manager_id], function(err, data){
//             console.log(data)('Employee update successful!')
//mainPrompts()
//         })
//     })
// }
// View all roles choice in mainPrompts()
function viewRole() {
    db.query('SELECT * FROM roles', function (err, data) {
        console.table(data)
        mainPrompts()
    })
}
// Add role choice in mainPrompts()
function addRole() {
    db.promise().query('SELECT * FROM departments')
        .then(([data]) => {
            const deptChoices = data.map(({ id, name }) => ({
                name: name,
                value: id
            }));
            prompt([
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
}
// Exit the app at quit() in mainPrompts()
function quit() {
    console.log("Exiting Company Database!");
    process.exit();
}

// ---------------------------------------------------------
// choices:
            // view departments - //dept. name and dept. ID
// Add department - //enter name of department

            // view employees - //employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// Add Employee - enter first, last name, role and manager
// Update Employee role - //select an employee to update and their new role(separate questions)

            // view role - //view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// Add role - //role name, salary, dept. for the role

