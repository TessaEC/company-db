// logo?

//load prompts
function mainPrompts() {
    prompt([{
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
            {
                name: "View Employees"
                value: "VIEW_EMPLOYEES"
            },
        ]
}])
}
            // choices: 
                //view all departments, view all roles, view all employees,
                //add a department, add a role, add an employee, and
                //update an employee role
            // view departments
                //dept. name - department ID's?
            // view employees
                //employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
            // view role
                //view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
            // Add dept.
                //enter name of department
            // Add role
                //role name, salary, dept. for the role
            // Add Employee
                //1st, last name, role and manager
            // Update Employee role
                //select an employee to update and their new role(separate questions?)