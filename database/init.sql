--init.sql
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(100),
  notes TEXT
  tags TEXT[]
);
