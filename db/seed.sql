INSERT INTO department (dept_name)
VALUES
    ("Anesthesia"),
    ("Coding"),
    ("Billing"),
    ("Legal");

INSERT INTO role (role_title, salary, dept_id)
VALUES
    ("MD", 200000, 1),
    ("CRNA", 100000, 1),
    ("Coding Manager", 80000, 2),
    ("Coder", 60000, 2),
    ("Compliance Manager", 80000, 3),
    ("Auditor", 40000, 3),
    ("Attorney", 150000, 4),
    ("Paralegal", 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Katie", "Heart", 1, NULL),
    ("Mabel", "Kay", 2, 1),
    ("Jack", "Sawyer", 3, NULL),
    ("Kelly", "Bryant", 4, 3),
    ("Lisa", "Evans", 5, NULL),
    ("Nancy", "Hendricks", 6, 5),
    ("Ky", "Silver", 7, NULL),
    ("Larry", "Peterson", 8, 7);


    