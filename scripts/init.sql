CREATE TABLE app_user (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash BYTEA NOT NULL
);

CREATE TABLE user_email (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES app_user(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE user_address (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES app_user(id) ON DELETE CASCADE,
    google_location JSONB
);

CREATE TABLE user_link (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES app_user(id) ON DELETE CASCADE,
    link VARCHAR(255) NOT NULL
);

CREATE TABLE user_title (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES app_user(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL
);

CREATE TABLE job (
    id SERIAL PRIMARY KEY,
    link VARCHAR(255) NOT NULL,
    apply_link VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    company_link VARCHAR(255),
    company_img_link VARCHAR(255),
    place VARCHAR(255),
    description TEXT,
    description_html TEXT,
    date DATE,
    insights TEXT
);

CREATE TABLE field (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    label VARCHAR(255) NOT NULL
);

CREATE TABLE entry (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    layout VARCHAR(255) NOT NULL
);

CREATE TABLE entry_field (
    id SERIAL PRIMARY KEY,
    entry_id INTEGER REFERENCES entry(id) ON DELETE CASCADE,
    field_id INTEGER REFERENCES field(id) ON DELETE CASCADE
);

CREATE TABLE section (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    field VARCHAR(255) NOT NULL
);

CREATE TABLE section_entry (
    id SERIAL PRIMARY KEY,
    section_id INTEGER REFERENCES section(id) ON DELETE CASCADE,
    entry_id INTEGER REFERENCES entry(id) ON DELETE CASCADE
);

CREATE TABLE resume (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES app_user(id) ON DELETE CASCADE,
    custom_url VARCHAR(255),
    user_email INTEGER REFERENCES user_email(id) ON DELETE CASCADE,
    user_link INTEGER REFERENCES user_link(id) ON DELETE CASCADE,
    user_title INTEGER REFERENCES user_title(id) ON DELETE CASCADE,
    pdf_url VARCHAR(255)
);

CREATE TABLE resume_section (
    id SERIAL PRIMARY KEY,
    resume_id INTEGER REFERENCES resume(id) ON DELETE CASCADE,
    section_id INTEGER REFERENCES section(id) ON DELETE CASCADE
);

CREATE TABLE job_field (
    id SERIAL PRIMARY KEY,
    job_id INTEGER REFERENCES job(id) ON DELETE CASCADE,
    field_id INTEGER REFERENCES field(id) ON DELETE CASCADE
);
