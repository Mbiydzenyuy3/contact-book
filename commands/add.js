// add.js
import { addContact, isNameTaken } from "../services/contactServices.js";
import inquirer from "inquirer";

export default {
  command: "add",
  describe: "Add a new contact",
  builder: {
    name: { demandOption: true, type: "string" },
    phone: { demandOption: true, type: "string" },
    email: { type: "string" },
    address: { type: "string" },
    tag: { type: "string" },
  },
  handler: async (argv) => {
    // 📦 If argv is not passed (interactive mode), prompt user manually
    if (!argv || !argv.name) {
      argv = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "Enter name:",
        },
        {
          type: "input",
          name: "phone",
          message: "Enter phone number:",
        },
        {
          type: "input",
          name: "email",
          message: "Enter email (optional):",
        },
        {
          type: "input",
          name: "address",
          message: "Enter address (optional):",
        },
        {
          type: "input",
          name: "tag",
          message: "Enter tag (optional):",
        },
      ]);
    }

    const { name, phone, email, address, tag } = argv;

    if (!name) {
      console.log("❌ Name is required.");
      process.exit(1);
    }

    if (name.length > 35) {
      console.log("❌ Name must be 35 characters or less.");
      process.exit(1);
    }

    if (await isNameTaken(name)) {
      console.log("❌ Name already exists. It must be unique.");
      process.exit(1);
    }

    if (!/^\d+$/.test(phone)) {
      console.log("❌ Phone must be numbers only.");
      process.exit(1);
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log("❌ Invalid email format.");
      process.exit(1);
    }

    const tags = tag ? tag.split(",").map((t) => t.trim()) : [];

    // if (tags.length > 1) {
    //   console.log("❌ Only one tag is allowed.");
    //   process.exit(1);
    // }

    await addContact({ name, phone, email, address, tag: tags });
    console.log("✅ Contact added successfully!");
  },
};
