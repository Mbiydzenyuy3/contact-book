//format.js
import chalk from "chalk";
import Table from "cli-table3";

function printHeader() {
  console.log(chalk.cyan.bold("\n Personal Contact Manager CLI\n"));
}

function printContact(contact) {
  console.log(chalk.yellow(`Name`), contact.name);
  console.log(chalk.green(`Phone:`), contact.phone);
  console.log(chalk.blue.bold(`Email`), contact.email);
  console.log(chalk.blue(`Address`), contact.address);

  if (contact.tag) {
    console.log(chalk.pink.bold(`Tag`), contact.tag.join(", "));
  }
  console.log();
}

function printTable(contacts) {
  const table = new Table({
    head: ["ID", "Name", "Phone", "Email", "Address", "Tag"],
    style: { head: ["cyan"] },
  });

  contacts.forEach((contact) => {
    table.push([
      contact.id,
      contact.name,
      contact.phone,
      contact.email,
      contact.address,

      contact.tag ? contact.tag.join(", ") : "",
    ]);
  });

  console.log(table.toString());
}

export { printHeader, printContact, printTable };
