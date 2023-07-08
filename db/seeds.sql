INSERT INTO department (name)
VALUES 
('Engineering'),
('Finance'),
('Marketing'),
('IT');

INSERT INTO role (title, salary, department_id)
VALUES
('Front End Developer', 75000, 1),
('Software Engineer', 120000, 1),
('Accountant', 10000, 2), 
('Stock Analyst', 150000, 2),
('Marketing Manager', 120000, 3), 
('Sales Lead', 90000, 3),
('Cybersecurity Manager', 100000, 4),
('UX Coordinator', 70000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Delwyn', 'Gamboa', 2, 1),
('Sunny', 'Kingston', 1, 1),
('Maya', 'Alvarez', 4, 1),
('Ivette', 'Chow', 3, 1),
('Joe', 'Sas', 6, 4),
('Selena', 'Tolentino', 5, 1),
('Diana', 'Walker', 7, 1),
('Channa', 'Morris', 8, 1);
