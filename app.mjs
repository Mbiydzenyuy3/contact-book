// app.js
import dotenv from "dotenv";
dotenv.config();

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import add from "./commands/add.mjs";
import list from "./commands/list.mjs";
import del from "./commands/delete.mjs";
import update from "./commands/update.mjs";
import search from "./commands/search.mjs";

yargs(hideBin(process.argv))
  .command(add)
  .command(list)
  .command(del)
  .command(update)
  .command(search)
  .demandCommand(1, "Please provide a valid command")
  .strict()
  .help().argv;
