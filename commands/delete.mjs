import {
  findContactById,
  deleteContact,
} from "../services/contactServices.mjs";
import { confirmAction } from "../utils/prompts.mjs";

export default {
  command: "delete <id>",
  describe: "Delete a contact by ID",
  handler: async ({ id }) => {
    const contact = await findContactById(id);
    if (!contact) {
      console.log("No contact found with that ID.");
      process.exit(0);
    }

    const confirm = await confirmAction(
      `Are you sure you want to delete "${contact.name}"?`
    );
    if (confirm) {
      await deleteContact(id);
    } else {
      console.log("Deletion cancelled.");
    }

    process.exit(0);
  },
};
