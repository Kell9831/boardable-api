CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(50) UNIQUE,
    name VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    CONSTRAINT chk_email CHECK (email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'), -- Valida que el email tenga formato de email válido si está presente
    CONSTRAINT chk_password_length CHECK (LENGTH(password) >= 6) 
);

CREATE TABLE boards (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  color VARCHAR(50) DEFAULT '#FFFFFF' NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  userid INTEGER REFERENCES Users(id)
);

CREATE TABLE lists (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  board_id INT REFERENCES boards(id) ON DELETE CASCADE
);

CREATE TABLE cards (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  list_id INT REFERENCES lists(id) ON DELETE CASCADE,
);