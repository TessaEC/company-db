# company-db
Build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

## Description
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

## Installation
MySql - npm install --save mysql2
node_modules - npm install
Inquirer - npm i inquirer@8.2.4
console.table - npm install console.table --save

## Usage
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database


## Visuals
Walkthrough snap shots of how the app runs.

Links to the test video and GitHub repo are at the bottom for reference.

![image](https://user-images.githubusercontent.com/118077000/224220088-b4f875eb-4341-46ce-9101-9c3a2dcc8694.png)
![image](https://user-images.githubusercontent.com/118077000/224220164-9e8ad63a-c032-4541-ab42-64805672e608.png)
![image](https://user-images.githubusercontent.com/118077000/224220256-d0d1a108-066a-4624-951d-db7d0fddd3d3.png)
![image](https://user-images.githubusercontent.com/118077000/224220387-ca72808b-5fc4-41bd-b1cd-ab9f67ecef40.png)
![image](https://user-images.githubusercontent.com/118077000/224220468-a744e218-cd03-4209-9699-f1f2e0759465.png)
![image](https://user-images.githubusercontent.com/118077000/224220650-fab9c17d-9fd5-43b7-9629-d064d6a49da4.png)
![image](https://user-images.githubusercontent.com/118077000/224220730-617e1a13-47a2-4768-8375-09863a46aa5b.png)
![image](https://user-images.githubusercontent.com/118077000/224220789-afc05876-9f92-4750-9780-f8c63c1c92bc.png)

Test Video URL: https://drive.google.com/file/d/19ywZk1H_Tgg58-xcrtqSCG8xX0p31zRO/view

GitHub repo URL: https://github.com/TessaEC/company-db

