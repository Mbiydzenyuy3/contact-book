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
    tags: {
      type: "string",
      describe: "Comma-separated tags",
    },
  },
  handler: async (argv) => {
    const tagList = argv.tags ? argv.tags.split(",") : [];
    await addContact({ ...argv, tags: tagList });
    process.exit(0);
  },
};
