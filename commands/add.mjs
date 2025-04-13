//add.mjs
import { argv } from "yargs";
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
    if (argv.phone.includes(",")) {
      console.log("only one phone number is allowed");
      process.exit(1);
    }

    // const tagList = argv.tags ? argv.tags.split(",") : [];
    const tags = [];
    if (argv.tags) {
      tagList = argv.tags.split(",").map((tag) => tag.trim());

      if (tagList.length < 1) {
        console.log("Only one tag is allowed per contact");
        process.exit(1);
      }
    }

    await addContact({ ...argv, tags: tags });
    process.exit(0);
  },
};
