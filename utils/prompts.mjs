import inquirer from "inquirer";

async function confirmAction(message = "Are you sure?") {
  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message,
      default: false,
    },
  ]);
  return confirm;
}

async function promptUpdateFields(contact) {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter new name:",
      default: contact.name,
    },
    {
      type: "input",
      name: "phone",
      message: "Enter new phone:",
      default: contact.phone,
    },
    {
      type: "input",
      name: "email",
      message: "Enter new email:",
      default: contact.email,
    },
    {
      type: "input",
      name: "notes",
      message: "Enter address:",
      default: contact.address,
    },
    {
      type: "input",
      name: "tags",
      message: "Enter tags (comma-separated):",
      default: contact.tags ? contact.tags.join(", ") : "",
    },
  ]);
}

export { confirmAction, promptUpdateFields };
