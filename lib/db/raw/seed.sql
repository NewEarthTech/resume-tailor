-- Seed for app_user
INSERT INTO app_user (name, email, password_hash) VALUES 
('John Doe', 'john@example.com', 'hashedpassword123'),
('Jane Smith', 'jane@example.com', 'hashedpassword456');

-- Seed for user_email
INSERT INTO user_email (user_id, email) VALUES 
(1, 'john.doe@example.com'),
(2, 'jane.smith@example.com');

-- Seed for user_address
INSERT INTO user_address (user_id, google_location) VALUES 
(1, '{"city": "New York", "country": "USA"}'),
(2, '{"city": "Los Angeles", "country": "USA"}');

-- Seed for user_link
INSERT INTO user_link (user_id, link) VALUES 
(1, 'http://johndoe.com'),
(2, 'http://janesmith.com');

-- Seed for user_title
INSERT INTO user_title (user_id, title) VALUES 
(1, 'Software Developer'),
(2, 'Data Scientist');

-- Seed for resume
INSERT INTO resume (user_id, custom_url, user_email, user_address, user_link, user_title, pdf_url) VALUES 
(1, 'john-doe-resume', 1, 1, 1, 1, 'http://johndoe.com/resume.pdf'),
(2, 'jane-smith-resume', 2, 2, 2, 2, 'http://janesmith.com/resume.pdf');

-- Seed for section
INSERT INTO section (title, layout) VALUES 
('Education', 'list'),
('Experience', 'grid');

-- Seed for resume_section
INSERT INTO resume_section (resume_id, section_id) VALUES 
(1, 1),
(2, 2);

-- Seed for entry
INSERT INTO entry (start_date, end_date, include) VALUES 
('2021-01-01', '2023-01-01', TRUE),
('2019-01-01', '2020-12-31', TRUE);

-- Seed for section_entry
INSERT INTO section_entry (section_id, entry_id) VALUES 
(1, 1),
(2, 2);

-- Seed for field
INSERT INTO field (input_type, name, value, label) VALUES 
('text', 'School', 'MIT', 'School Name'),
('textarea', 'Description', 'Studied Computer Science.', 'Education Details');

-- Seed for entry_field
INSERT INTO entry_field (entry_id, field_id) VALUES 
(1, 1),
(1, 2);

-- Seed for job
INSERT INTO job (link, title, company, company_link, company_img_link, place, description_html, date, insights) VALUES 
('http://job1.com', 'Backend Developer', 'TechCorp', 'http://techcorp.com', 'http://techcorp.com/logo.jpg', 'New York', '<p>Develop and maintain backend systems.</p>', '2023-10-25', 'Great team environment'),
('http://job2.com', 'Frontend Developer', 'DesignInc', 'http://designinc.com', 'http://designinc.com/logo.jpg', 'Los Angeles', '<p>Design and implement user interfaces.</p>', '2023-10-25', 'Opportunities for growth');

-- Seed for job_field
INSERT INTO job_field (job_id, field_id) VALUES 
(1, 1),
(2, 2);

-- Seed for job_resume
INSERT INTO job_resume (job_id, resume_id) VALUES 
(1, 1),
(2, 2);
