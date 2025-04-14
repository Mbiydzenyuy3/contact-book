//search.mjs
import { searchContacts } from "../services/contactServices.js";
import { printHeader, printTable } from "../utils/format.js";

export default {
  command: "search <keyword>",
  describe: "Search contacts by name, phone, or email",
  handler: async ({ keyword }) => {
    const results = await searchContacts(keyword);

    if (results.length === 0) {
      console.log(`No contacts found matching "${keyword}".`);
    } else {
      printHeader();
      printTable(results);
    }

    process.exit(0);
  },
};
