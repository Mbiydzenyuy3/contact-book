--init.sql
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  email VARCHAR(100),
  address TEXT
  tag TEXT[]
);
