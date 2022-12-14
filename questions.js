export default [
    {
        "type": "input",
        "name": "filename",
        "message": "Enter the name of the README file",
        "default": "README.md"
    },
    {
        "type": "input",
        "name": "name",
        "message": "Enter your name"
    },
    {
        "type": "input",
        "name": "email",
        "message": "Enter your email address"
    },
    {
        "type": "input",
        "name": "username",
        "message": "Enter your Github username"
    },
    {
        "type": "input",
        "name": "reponame",
        "message": "Enter the name of your repository"
    },
    {
        "type": "input",            // I'd rather use input than editor
        "name": "description",
        "message" : "Please write a short description of your project",
        "default" : "Insert description here"
    },
    {
        // NOTE: License should be a valid SPDX identifier.
        // See https://spdx.org/licenses/preview/
        "type": "list",     // TODO: Probably should use a rawlist or expand
        "name": "license",
        "message": "Choose which license you would like to use for your project",
        "choices": ["MIT", "Apache-2.0", "BSD-3-Clause", "GPL-2.0-or-later","GPL-3.0-or-later","MPL-2.0"],       // TODO: Add a License to Ill! :D
        "default": "MIT"
    },
    {
        "type" : "input",
        "name" : "install_command",
        "message": "How should I install dependencies?",
        "default" : "npm i"             // TODO: How should I format code blocks?
    },
    {
        "type" : "input",
        "name" : "test_command",
        "message": "How should I run tests?",
        "default" : "npm test"      // TODO: Think about Jasmine later
    },
    {
        "type" : "input",
        "name" : "use_command",
        "message" : "How should I use this program?",
        "default" : "node index.js"     // TODO: What was the NPM version of this?
    },
    {
        "type" : "input",
        "name" : "need_to_know",
        "message": "What does the user need to know about using this repo?",
        "default" : ""      // Don't expose it to sunlight. Don't get it wet. Don't feed it after midnight.
    },
    {
        "type" : "input",
        "name" : "how_to_contribute",
        "message": "How should the user contribute to this repo?",
        "default" : ""      // Talk less. Smile more.
    },
    
    {
        "type": "confirm",
        "name": "confirmation",
        "message": "Is this information correct?",
        "default": false
    }
];