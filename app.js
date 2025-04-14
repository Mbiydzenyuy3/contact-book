#!/usr/bin/env node
// app.js
import dotenv from "dotenv";
dotenv.config();

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import add from "./commands/add.js";
import list from "./commands/list.js";
import del from "./commands/delete.js";
import update from "./commands/update.js";
import search from "./commands/search.js";

yargs(hideBin(process.argv))
  .command(add)
  .command(list)
  .command(del)
  .command(update)
  .command(search)
  .demandCommand(1, "Please provide a valid command")
  .strict()
  .help().argv;
