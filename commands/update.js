//update.mjs
import { findContactById, updateContact } from "../services/contactServices.js";
import { promptUpdateFields } from "../utils/prompts.js";

export default {
  command: "update <id>",
  describe: "Update a contact by ID",
  handler: async ({ id }) => {
    const contact = await findContactById(id);
    if (!contact) return console.log("Contact not found.");

    const updates = await promptUpdateFields(contact);

    if (updates.phone && updates.phone.includes(",")) {
      console.log("Only one phone number is allowed");
      process.exit(1);
    }

    let tags = contact.tag;
    if (updates.tag) {
      const newTags = updates.tag.split(",").map((tag) => tag.trim());
      if (newTags.length > 1) {
        console.log("Only one tag is allowed per contact");
        process.exit(1);
      }
      tags = newTags;
    }

    await updateContact(id, { ...updates, tag: tags });
    process.exit(0);
  },
};
