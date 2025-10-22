// Create a new router
const express = require("express");
const router = express.Router();

// Handle the main routes
// Handle the routes
router.get("/", (req, res) => res.send("Hello World!"));

// the /about route — full HTML page
router.get('/about', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>MyPage</title>
        <meta charset="UTF-8">
    </head>
    <body>
        <h1>This is the about page</h1>
        <h2>About Me</h2>
        <p>Hello, my name is Muhammad Ahmad. I am a third-year student at Goldsmiths University, studying BSc Computer Science.</p>
    </body>
    </html>
  `);
});

// the /contact route — adds email info
router.get('/contact', (req, res) => {
  res.send(`
    <h1>This is the contact page</h1>
    <p>You can contact me at: <strong>mahma009@gold.ac.uk</strong></p>
  `);
});

// the /date route — shows current date and time
router.get('/date', (req, res) => {
  const currentDate = new Date(); // Get current date/time
  res.send(`
    <h1>This is the date page</h1>
    <p>Current date and time: ${currentDate}</p>
  `);
});

// the /welcome route
router.get('/welcome/:name', (req, res) => {
  const userName = req.params.name; // get 'name' from the URL
  res.send(`<h1>Welcome ${userName}!</h1>`);
});

// the /chain route — demonstrates middleware chaining
router.get('/chain', 
  // First handler: logs a message and writes intro text
  (req, res, next) => {
    console.log("Visitor reached /chain route");
    res.write("<h1>Welcome to the Chain Route!</h1>");
    res.write("<p>This is the first handler, preparing your content...</p>");
    next(); // move on to the next function
  },

  // Second handler: adds more HTML and ends the response
  (req, res) => {
    res.write("<p>Here are some of my other pages:</p>");
    res.write('<ul>');
    res.write('<li><a href="/about">About Me</a></li>');
    res.write('<li><a href="/contact">Contact</a></li>');
    res.write('<li><a href="/date">Current Date</a></li>');
    res.write('<li><a href="/welcome">Welcome page</a></li>');
    res.write('</ul>');
    res.end("<p>This was created using chained route handlers!</p>");
  }
);

const path = require("path"); // Import path module at the top of file if not already there

// the /file route — sends an actual HTML file
router.get('/file', (req, res) => {
  res.sendFile(path.join(__dirname, '../a.html'));
});

// Export the router object so index.js can access it
module.exports = router;
