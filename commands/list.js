//list.mjs
import { getAllContacts } from "../services/contactServices.js";
import { printHeader, printTable } from "../utils/format.js";
import clear from "clear";

export default {
  command: "list",
  describe: "List all contacts",
  handler: async () => {
    clear();
    console.log("Listing contacts..."); // Add this line for debugging
    const contacts = await getAllContacts();
    printHeader();

    clear();

    if (contacts.length === 0) {
      console.log("No contacts found.");
    } else {
      printTable(contacts);
    }

    process.exit(0);
  },
};
