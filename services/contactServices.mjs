//contactServices.js

import { client as db, connectToDatabase } from "../database/database.mjs";

await connectToDatabase();

async function addContact({ name, phone, email, address, tag }) {
  // check for existing contact with phone or email
  const duplicate = await db.query(
    `SELECT * FROM contacts WHERE name = $1 OR phone = $2`, [name, phone]
  );

  if (duplicate.rows.length > 0) {
    console.log('Contact with this name and phone already exist')
    return;
  }

  //Insert if no duplicate is found
  await db.query(
    "INSERT INTO contacts (name, phone, email, address, tag) VALUES ($1, $2, $3, $4, $5)",
    [name, phone, email, address, tag]
  );
  console.log("Contact added!");
}

async function getAllContacts() {
  const result = await db.query("SELECT * FROM contacts ORDER BY id ASC");
  return result.rows;
}

async function findContactById(id) {
  const result = await db.query("SELECT * FROM contacts WHERE id = $1", [id]);
  return result.rows[0];
}

async function updateContact(id, updates) {
  const { name, phone, email, address, tag } = updates;
  await db.query(
    `UPDATE contacts SET name=$1, phone=$2, email=$3, address=$4, tag=$5 WHERE id=$6`,
    [name, phone, email, address, tag, id]
  );
  console.log(`Contact with ID ${id} updated!`);
}

async function deleteContact(id) {
  await db.query("DELETE FROM contacts WHERE id = $1", [id]);
  console.log(`Contact with ID ${id} deleted!`);
}

async function searchContacts(keyword) {
  const result = await db.query(
    `SELECT * FROM contacts WHERE name ILIKE $1 OR phone ILIKE $1 OR email ILIKE $1`,
    [`%${keyword}%`]
  );
  return result.rows;
}

export {
  addContact,
  getAllContacts,
  findContactById,
  updateContact,
  deleteContact,
  searchContacts,
};
