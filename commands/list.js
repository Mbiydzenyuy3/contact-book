//list.mjs
import { getAllContacts } from "../services/contactServices.js";
import { printHeader, printTable } from "../utils/format.js";

export default {
  command: "list",
  describe: "List all contacts",
  handler: async () => {
    console.log("Listing contacts..."); // Add this line for debugging
    const contacts = await getAllContacts();
    printHeader();

    if (contacts.length === 0) {
      console.log("No contacts found.");
    } else {
      printTable(contacts);
    }

    process.exit(0);
  },
};
