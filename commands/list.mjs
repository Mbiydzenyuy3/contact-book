//list.mjs
import { getAllContacts } from "../services/contactServices.mjs";
import { printHeader, printTable } from "../utils/format.mjs";

export default {
  command: "list",
  describe: "List all contacts",
  handler: async () => {
    console.log("Listing contacts..."); // Add this log for debugging
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
