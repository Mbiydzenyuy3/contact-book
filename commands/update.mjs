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

    if (updates.phone && updates.phone.include(",")) {
      console.log("Only one phone number is allowed");
      process.exit(1);
    }

    const updates = await promptUpdateFields(contact);
    const tags = contact.tag;
    if (updates.tag) {
      tags = updates.tag.split(",").map((tag) => tag.trim());
      if (tags.length > 1) {
        console.log("Only one tag is allowed per contact");
        process.exit(1);
      }
    }

    await updateContact(id, { ...updates, tags });
    process.exit(0);
  },
};
