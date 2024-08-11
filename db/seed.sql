-- INSERT INTO department (name)
-- VALUES ('Web Development'),
--        ('Data Science');


-- INSERT INTO role (title, salary, department)
-- VALUES ('manager', 65000, 1),
--        ('junior developer', 55000, 1),
--        ('supervisor', 75000, 2),
--        ('analyst', 60000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Oliver', 'Cappis', 1, NULL),
       ('Ella', 'Connor', 2, 1),
       ('Joey', 'Leeper', 3, NULL),
       ('Shep', 'Helton', 4, 3);