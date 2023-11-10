INSERT INTO department (department_name) 
VALUES  ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Development');

INSERT INTO title (title, salary, department_id)
VALUES  ('Sales Lead', '100000', 1),
        ('Salesperson', '80000', 1),
        ('Lead Engineer', '150000', 2),
        ('Software Engineer', '120000', 2),
        ('Account Manager', '160000', 3),
        ('Accountant', '125000', 3),
        ('Legal Team Lead', '250000', 4),
        ('Lawyer', '190000', 4),
        ('Senior Developer', '1000000', 5),
        ('Junior Developer', '25000', 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Bill', 'Nye', '1', NULL),
        ('John', 'Doe', '2', '1'),
        ('Mike', 'Makalu', '3', NULL),
        ('Tony', 'Allen', '4', '3'),
        ('Tim', 'Toolman', '5', NULL),
        ('Ashley', 'Rodriguez', '6', '5'),
        ('Sue', 'Lawson', '7', NULL),
        ('Robert', 'Lauer', '8', '7'),
        ('Ronson', 'Brother', '9', NULL),
        ('Scott', 'Rutherford', '10', '9');