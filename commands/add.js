//add.mjs
import { addContact, isNameTaken } from "../services/contactServices.js";

export default {
  command: "add",
  describe: "Add a new contact",
  builder: {
    name: { demandOption: true, type: "string" },
    phone: { demandOption: true, type: "string" },
    email: { type: "string" },
    address: { type: "string" },
    tag: {
      type: "string",
      // describe: "Comma-separated tag",
    },
  },
  handler: async (argv) => {
    const { name, phone, email } = argv;

    if (argv.phone.includes(",")) {
      console.log("only one phone number is allowed");
      process.exit(1);
    }

    let tag = [];
    if (argv.tag) {
      tag = argv.tag.split(",").map((t) => t.trim());

      if (tag.length < 1) {
        console.log("Only one tag is allowed per contact");
        process.exit(1);
      }
    }

    if (!name) {
      console.log("❌ Name is required.");
      process.exit(1);
    }

    // if (name.length ===12 > 35) {
    //   console.log("❌ Name must be 35 characters or less.");
    //   process.exit(1);
    // }

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

    await addContact({ ...argv, tag: tag });
    process.exit(0);
  },
};
