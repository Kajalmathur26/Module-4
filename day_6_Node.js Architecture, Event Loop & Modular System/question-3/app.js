// app.js

import os from "os";
import fs from "fs/promises";

console.log("Free Memory:", os.freemem());
console.log("CPU Cores:", os.cpus().length);

const dataFile = "data.txt";
const readmeFile = "Readme.md";

async function fileOperations() {
  try {
    await fs.writeFile(dataFile, "Hello World");
    console.log(dataFile + " created");

    await fs.writeFile(readmeFile, "## This is first line in Readme");
    console.log(readmeFile + " created");

    const content = await fs.readFile(dataFile, "utf-8");
    console.log("Content of " + dataFile + ":");
    console.log(content);

    await fs.appendFile(dataFile, "\nThis is second line");
    console.log("Appended new line to " + dataFile);

    await fs.unlink(readmeFile);
    console.log(readmeFile + " deleted");
  } catch (err) {
    console.error("Error:", err);
  }
}

fileOperations();
