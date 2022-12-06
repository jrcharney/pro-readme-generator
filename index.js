// File: index.js
// DONE TODO: Include packages needed for this application
import inquirer from 'inquirer';
import * as fs from 'fs';     // Since we're writing a file, we should use the fs library

// TODO: Create an array of questions for user input
// See https://en.wikipedia.org/wiki/Comparison_of_free_and_open-source_software_licenses
const questions = [
    {
        type: "input",
        name: "filename",
        message: "Enter the name of this file",
        default: "README.md"
    },
    {
        type: "input",
        name: "name",
        message: "Enter your name"
    },
    {
        type: "input",
        name: "email",
        message: "Enter your email address"
    },
    {
        type: "input",
        name: "username",
        message: "Enter your Github username"
    },
    {
        type: "input",
        name: "reponame",
        message: "Enter the name of your repository"
    },
    {
        type: "list",
        name: "license",
        message: "Choose which license you would like to use for your project",
        choices: ["mit", "gpl","gpl3","bsd","freebsd","license to ill"],
        default: "mit"
    },
    {
        type: "confirm",
        name: "confirmation",
        message: "Is this information correct?",
        validate(value,answers){
            if(value.toLowerCase() !== "yes"){
                return "Aborting. Try again later.";
            }
            return true;
        }
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    // TODO: Swap out some of the pushes later. Make it less "pushy".
    // TODO: Could we use template data as a heredoc?
    let fileData = [];
    fileData.push(`# ${data.reponame}`)
    fileData.push(`\n`);                    // This should make a double space line when our lines are joined.
    fileData.push(`Created by ${data.name} (@${data.username})`)

    fileData.push(`## Description`);
    fileData.push(`\n`);
    fileData.push((data.description !== "") ? data.description : "Insert description here");
    fileData.push(`\n`);

    fileData.push(`## Table of Contents`);
    fileData.push(`\n`);
    fileData.push(`* [License](#license)`);
    fileData.push(`* [Installation](#installation)`);
    fileData.push(`* [Usage](#usage)`);
    fileData.push(`* [How to Contribute](#how-to-contribute)`);
    fileData.push(`* [Tests](#tests)`);
    fileData.push(`* [Questions](#questions)`);
    fileData.push(`\n`);

    fileData.push(`## License`);
    fileData.push(`\n`);
    fileData.push(`A license to ill!`);     // TODO: Insert License here
    fileData.push(`\n`);

    fileData.push(`## Installation`);
    fileData.push(`\n`);
    fileData.push(`Insert Text Here`);
    fileData.push(`\n`);

    fileData.push(`## Usage`);
    fileData.push(`\n`);
    fileData.push(`Insert Text Here`);
    fileData.push(`\n`);

    fileData.push(`## How to Contribute`);
    fileData.push(`\n`);
    fileData.push(`Insert Text Here`);
    fileData.push(`\n`);

    fileData.push(`## Tests`);
    fileData.push(`\n`);
    fileData.push(`Insert Text Here`);
    fileData.push(`\n`);

    fileData.push(`## Questions`);
    fileData.push(`\n`);
    fileData.push(`If you have any questions about this project, contact me at [${data.email}](mailto:${data.email})`);
    fileData.push(`\n`);

    fileData = fileData.join('\n');

    fs.writeFile(fileName,fileData,(err) => err ? console.error(err) : console.log("Success!"));
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions)
    .then((answers) => {
        // TODO: Sanitize filenames
        // replace regex borrowed from https://bobbyhadz.com/blog/javascript-remove-file-extension-from-string
        const filename = `${data.filename.replace(/\.[^\/.]+$/, '')}.md`
        writeToFile(filename,data);
    })
    .catch((error) => {
        if(error.isTtyError){
            console.error(`Error: Something about the environment wouldn't let me run this program.`);
            // TODO: like what?
        }else{
            console.error(`Something else happened that I don't know what to do with it.`);
            console.error(error);
        }
    })
}

// Function call to initialize app
init();
