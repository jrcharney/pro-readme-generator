// File: index.js
// DONE TODO: Include packages needed for this application
import inquirer from 'inquirer';
import * as fs from 'fs';     // Since we're writing a file, we should use the fs library
import { getLicense } from 'license';
import { makeBadge, ValidationError } from 'badge-maker';
import questions from './questions.js'; // This CANNOT be a JSON file!
import MDDoc from './modules/mddoc.js';
// import Section from './modules/section,js';

// TODO: Create an array of questions for user input
// See https://en.wikipedia.org/wiki/Comparison_of_free_and_open-source_software_licenses
//const answers = await inquirer.prompt(questions);
// We imported this, so problem solved.

//const filename = `${answers.name.toLowerCase().split("").join("-")}.json`;

function writeToFile(fileName, data) {
    // Let's not destroy the files we use for this project. Let's put our demonstration in its own directory
    const filePath = `./demo/${data.reponame}`;
    if(!fs.existsSync(filePath)){
        fs.mkdirSync(filePath, {recursive: true})
    }

    // TODO: Put badge stuff in its own file later.
    // Badge settings
    const format = {
        "label" : "license",
        "message" : data.license,
        "labelColor" : "gray",  // background color
        "color" : "lightgray",  // foreground color
        "style" : "flat"
    };

    // Create an image directory in our repo directory
    const imagePath = `${filePath}/assets/images`;
    if(!fs.existsSync(imagePath)){
        fs.mkdirSync(imagePath, {recursive: true})
    }

    // Write our badge file
    const badgeSvg = makeBadge(format);
    fs.writeFileSync(`${imagePath}/LICENSE.svg`, badgeSvg, (err) => err ? console.error(err) : console.log("Success!"))

    // Create our README file.
    const readme = new MDDoc();
    readme.setTitleHeader(data.reponame)
          .setTitleContent(`Created by ${data.name} (@${data.username})`)
          .addSection("Description",data.description)
          .addSection("License",`![data.license](./assets/images/)`)
          .addSection("Installation",data.install_command)
          .addSection("Testing",data.test_command)
          .addSection("Usage",data.use_command)
          .addSection("Other things you should know",data.need_to_know)
          .addSection("How to Contribute",data.how_to_contribute)
          .addSection("Questions",`If you have any questions about this project, contact me at [${data.email}](mailto:${data.email}).`);

    const now = new Date();
    const readmeData = readme.writeDoc();
    const licenseData = getLicense(data.license,{author: data.name, year: `${now.getFullYear()}` })

    // Probably should use writeFileSync since inquirer uses promises
    // TODO: should probably use .then and .catch on these next two lines
    fs.writeFileSync(`${filePath}/${fileName}`,readmeData,(err) => err ? console.error(err) : console.log("Success!"));
    fs.writeFileSync(`${filePath}/LICENSE.txt`, licenseData, (err) => err ? console.error(err) : console.log("Success!"));
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions)
    .then((answers) => {
        // TODO: Sanitize filenames
        // replace regex borrowed from https://bobbyhadz.com/blog/javascript-remove-file-extension-from-string
        //const filename = `${data.filename.replace(/\.[^\/.]+$/, '')}.md`
        writeToFile(answers.filename,answers);
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
