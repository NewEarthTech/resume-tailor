-- Create Tables
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255)
);

CREATE TABLE user_email (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    email VARCHAR(255)
);

CREATE TABLE user_address (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    google_location JSONB
);

CREATE TABLE user_link (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    link TEXT
);

CREATE TABLE user_title (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255)
);

CREATE TABLE resume (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    custom_url VARCHAR(255),
    user_email INTEGER REFERENCES user_email(id),
    user_address INTEGER REFERENCES user_address(id),
    user_link INTEGER REFERENCES user_link(id),
    user_title INTEGER REFERENCES user_title(id),
    pdf_url TEXT
);

CREATE TYPE layout_type AS ENUM ('row', 'grid', 'block', 'list');

CREATE TABLE section (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    layout layout_type
);

CREATE TABLE resume_section (
    id SERIAL PRIMARY KEY,
    resume_id INTEGER REFERENCES resume(id),
    section_id INTEGER REFERENCES section(id)
);

CREATE TABLE entry (
    id SERIAL PRIMARY KEY,
    start_date DATE,
    end_date DATE,
    include BOOLEAN
);

CREATE TABLE section_entry (
    id SERIAL PRIMARY KEY,
    section_id INTEGER REFERENCES section(id),
    entry_id INTEGER REFERENCES entry(id)
);

CREATE TYPE field_type AS ENUM ('select', 'textarea', 'text', 'date');

CREATE TABLE field (
    id SERIAL PRIMARY KEY,
    input_type field_type,
    name VARCHAR(255),
    value TEXT,
    label VARCHAR(255)
);

CREATE TABLE entry_field (
    id SERIAL PRIMARY KEY,
    entry_id INTEGER REFERENCES entry(id),
    field_id INTEGER REFERENCES field(id)
);

CREATE TABLE job (
    id SERIAL PRIMARY KEY,
    link TEXT,
    title VARCHAR(255),
    company VARCHAR(255),
    company_link TEXT,
    company_img_link TEXT,
    place TEXT,
    description_html TEXT,
    date DATE,
    insights TEXT
);

CREATE TABLE job_field (
    id SERIAL PRIMARY KEY,
    job_id INTEGER REFERENCES job(id),
    field_id INTEGER REFERENCES field(id)
);

CREATE TABLE job_resume (
    id SERIAL PRIMARY KEY,
    job_id INTEGER REFERENCES job(id),
    resume_id INTEGER REFERENCES resume(id)
);
