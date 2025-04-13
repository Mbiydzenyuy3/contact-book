//add.mjs
import { addContact } from "../services/contactServices.mjs";

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

    await addContact({ ...argv, tag: tag });
    process.exit(0);
  },
};
