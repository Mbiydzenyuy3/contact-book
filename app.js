#!/usr/bin/env node
// app.js

import dotenv from "dotenv";
dotenv.config();

// import yargs from "yargs";
// import { hideBin } from "yargs/helpers";

import { printHeader, printTable } from "./utils/format.js";
import { getAllContacts } from "./services/contactServices.js";
import inquirer from "inquirer";
import add from "./commands/add.js";
import list from "./commands/list.js";
import del from "./commands/delete.js";
import update from "./commands/update.js";
import search from "./commands/search.js";
import clear from "clear"; // install this

// yargs(hideBin(process.argv))
//   .command(add)
//   .command(list)
//   .command(del)
//   .command(update)
//   .command(search)
//   .demandCommand(1, "Please provide a valid command")
//   .strict()
//   .help().argv;

async function mainMenu() {
  let exit = false;

  while (!exit) {
    // Clear screen and print fresh header + table each loop
    clear();
    printHeader();

    const contacts = await getAllContacts();
    printTable(contacts);
    const { option } = await inquirer.prompt([
      {
        type: "list",
        name: "option",
        message: "📇 Welcome To My ContactBook CLI — Choose an action:",
        choices: [
          { name: "➕ Add Contact", value: "add" },
          { name: "📄 List Contacts", value: "list" },
          { name: "🔍 Search Contact", value: "search" },
          { name: "🗑️ Delete Contact", value: "delete" },
          { name: "✏️ Update Contact", value: "update" },
          { name: "❌ Exit", value: "exit" },
        ],
      },
    ]);

    // When an action is chosen, clear the screen so only the prompts show
    clear();

    switch (option) {
      case "add":
        await add.handler();
        break;

      case "list":
        await list.handler();
        break;

      case "search":
        const { keyword } = await inquirer.prompt({
          type: "input",
          name: "keyword",
          message: "Enter search term:",
        });
        await search.handler({ keyword });
        break;

      case "delete":
        const { id: deleteId } = await inquirer.prompt({
          type: "input",
          name: "id",
          message: "Enter contact ID to delete:",
        });
        await del.handler({ id: deleteId });
        break;

      case "update":
        const { id: updateId } = await inquirer.prompt({
          type: "input",
          name: "id",
          message: "Enter contact ID to update:",
        });
        await update.handler({ id: updateId });
        break;

      case "exit":
        exit = true;
        console.log("👋 Bye!");
        break;
    }

    if (!exit) {
      await inquirer.prompt({
        type: "input",
        name: "continue",
        message: "Press [Enter] to return to the main menu...",
      });
    }
  }
}
mainMenu();
