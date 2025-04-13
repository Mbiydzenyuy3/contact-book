//update.mjs
import {
  findContactById,
  updateContact,
} from "../services/contactServices.mjs";
import { promptUpdateFields } from "../utils/prompts.mjs";

export default {
  command: "update <id>",
  describe: "Update a contact by ID",
  handler: async ({ id }) => {
    const contact = await findContactById(id);
    if (!contact) return console.log("Contact not found.");

    const updates = await promptUpdateFields(contact);
    const tags = updates.tags
      ? updates.tags.split(",").map((t) => t.trim())
      : contact.tags;

    await updateContact(id, { ...updates, tags });
    process.exit(0);
  },
};
