const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


const employees = [];

function promptManager() {
  console.log('Please enter the team manager’s information:');
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Manager's name:",
      },
      {
        type: 'input',
        name: 'id',
        message: "Manager's ID:",
      },
      {
        type: 'input',
        name: 'email',
        message: "Manager's email:",
      },
      {
        type: 'input',
        name: 'officeNumber',
        message: "Manager's office number:",
      },
    ])
    .then((answers) => {
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      employees.push(manager);
      promptMenu();
    });
}

function promptEngineer() {
  console.log('Please enter the engineer’s information:');
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Engineer's name:",
      },
      {
        type: 'input',
        name: 'id',
        message: "Engineer's ID:",
      },
      {
        type: 'input',
        name: 'email',
        message: "Engineer's email:",
      },
      {
        type: 'input',
        name: 'github',
        message: "Engineer's GitHub username:",
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      employees.push(engineer);
      promptMenu();
    });
}

function promptIntern() {
  console.log('Please enter the intern’s information:');
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Intern's name:",
      },
      {
        type: 'input',
        name: 'id',
        message: "Intern's ID:",
      },
      {
        type: 'input',
        name: 'email',
        message: "Intern's email:",
      },
      {
        type: 'input',
        name: 'school',
        message: "Intern's school:",
      },
    ])
    .then((answers) => {
      const intern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      employees.push(intern);
      promptMenu();
    });
}

function promptMenu() {
  console.log('\nPlease choose what you would like to do next:');
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'option',
        message: 'Choose an option:',
        choices: ['Add an engineer', 'Add an intern', 'Finish building my team'],
      },
    ])
    .then((answers) => {
      switch (answers.option) {
        case 'Add an engineer':
          promptEngineer();
          break;
        case 'Add an intern':
          promptIntern();
          break;
        case 'Finish building my team':
          generateTeam();
          break;
        default:
          console.log('Invalid option.');
        }
      });
    }

    function generateTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(employees), 'utf-8');
    console.log("The HTML has been generated at ${outputPath}");
    }
    
    promptManager();      