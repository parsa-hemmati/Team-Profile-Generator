const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const render = employees => {
  const html = [];

  // Add the main HTML structure
  html.push(...generateHTMLStructure());

  // Generate a div for each employee
  for (let i = 0; i < employees.length; i++) {
    const employee = employees[i];

    // Get the appropriate template file
    const templateFile = path.resolve(templatesDir, `./${employee.getRole()}.html`);

    // Read the template file
    let template = fs.readFileSync(templateFile, "utf8");

    // Replace placeholders with employee data
    template = replacePlaceholders(template, "name", employee.getName());
    template = replacePlaceholders(template, "role", employee.getRole());
    template = replacePlaceholders(template, "id", employee.getId());
    template = replacePlaceholders(template, "email", employee.getEmail());
    template = replacePlaceholders(template, "officeNumber", employee.getOfficeNumber());
    template = replacePlaceholders(template, "github", employee.getGithub());
    template = replacePlaceholders(template, "school", employee.getSchool());

    // Add the div to the HTML array
    html.push(template);
  }

  // Add the closing HTML tags
  html.push(...generateHTMLClosingTags());

  return html.join("");
};

const generateHTMLStructure = () => {
  return [
    "<!DOCTYPE html>",
    "<html lang='en'>",
    "<head>",
    "  <meta charset='UTF-8'>",
    "  <meta name='viewport' content='width=device-width, initial-scale=1.0'>",
    "  <meta http-equiv='X-UA-Compatible' content='ie=edge'>",
    "  <title>My Team</title>",
    "  <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T' crossorigin='anonymous'>",
    "</head>",
    "<body>",
    "  <nav class='navbar navbar-dark bg-primary mb-5'>",
    "    <span class='navbar-brand mb-0 h1 w-100 text-center'>My Team</span>",
    "  </nav>",
    "  <div class='container'>"
  ];
};

const generateHTMLClosingTags = () => {
  return [
    "  </div>",
    "  <script src='https://code.jquery.com/jquery-3.4.1.min.js' integrity='sha384-J6qa626UO9hCkEu7tJSkjlzGwFIXwlBfBma18EKn wish4OkS9VwMvXcPNIQ7bFh/n' crossorigin='anonymous'></script>",
    "  <script src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js' integrity='sha384-JjSmVgyd0p3pXB1r RibtwEjFfW9S4471KGK1DRYBaK7jlak5xks1FwOgYiLyLPMO' crossorigin='anonymous'></script>",
    "</body>",
    "</html>"
  ];
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp(`{{ ${placeholder} }}`, "gm");
    return template.replace(pattern, value);
};
