/* eslint-disable camelcase */
// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

//mailgun API import
const {mailgunPollEmail, mailgunVoteNotification} = require("./mailgun.js");

const {
  getLinksFromChoiceID,
  getChoicesFromPollLink,
  createNewPoll,
  createNewChoice,
  createNewVote
} = require('./db/queries/dbFunctions');

const generateRandomString = require('./lib/generateRandomString');
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.

app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const shareRoutes = require("./routes/shareRoutes");
const resultsRoutes = require('./routes/resultsRoutes');
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));

app.use("/share/:id", shareRoutes);
app.use('/results/:id', resultsRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/polls/:id", (req, res) => {
  getChoicesFromPollLink(req.params.id)
    .then((response) => {
      console.log("RESPONSE**:", response);

      const templateVars = {
        potato: response,
        poll_id: req.params.id
      };


      res.render("show_poll", templateVars);
    });
});

app.post("/polls", (req, res) => {

  const pollLink = generateRandomString();
  const adminLink = generateRandomString();
  console.log(req.body.anonymous, "humhumuh");
  let anonymous = false;
  if (req.body.anonymous === 'on') {
    anonymous = true;
  }

  mailgunPollEmail(req.body.email, pollLink, adminLink);

  const newPoll = {
    email_address: req.body.email,
    question: req.body.question,
    anonymous: anonymous,
    admin_link: adminLink,
    poll_link: pollLink,
    is_active: true
  };

  //console.log("New Poll:", newPoll);
  createNewPoll(newPoll)
    .then((createdPoll) => {
      console.log("For testing:", req.body);
      let keys = Object.keys(req.body);
      let filteredTitles = [];

      //combine if statements into one (in forEach)
      keys.forEach(title => {
        if (/^title/.test(title)) {
          filteredTitles.push(title);
        }
      });
      let filteredDescriptions = [];

      keys.forEach(description => {
        if (/^description/.test(description)) {
          filteredDescriptions.push(description);
        }
      });
      filteredTitles.forEach((title, index) => {

        let newChoice = {
          poll_id: createdPoll.id,
          title: req.body[title],
          description: req.body[filteredDescriptions[index]]
        };
        createNewChoice(newChoice);
      });

      console.log(createdPoll, 'hewwo');
      console.log(filteredDescriptions);
      console.log(filteredTitles);

      res.redirect(`/share/${pollLink}`);
    });
});

app.post("/polls/:id", (req, res) => {

  console.log("123 *** req.body:", req.body);
  console.log("456 *** trying to get a choice id", req.body.rankedChoices[0]);
  //console.log("req.params:", req.params.id);

  const firstChoiceID = req.body.rankedChoices[0];
  //Get email, poll and admin links using first votes choiceID
  getLinksFromChoiceID(firstChoiceID)
    .then((result) => {
      console.log("adminLink", result[0].admin_link, "pollLink", result[0].poll_link, "email_address", result[0].email_address);
      console.log("DOES THIS HAVE EMAILS AND LINKS", result[0]);

      const adminLink = result[0].admin_link;
      const pollLink = result[0].poll_link;
      const email_address = result[0].email_address;

      mailgunVoteNotification(email_address, pollLink, adminLink);
      //mailgunVoteNotification("bita.janzadeh@hotmail.com", "22", '');

    });

  let name = req.body.name;
  db.query(`
    INSERT INTO names (name)
    VALUES ($1)
    RETURNING *;
  `, [name])
    .then((db) => {
      console.log(db.rows);
      //Calculates vote weight of every choice from ranked list
      const calculateVoteWeight = (choice, rankedArray) => {
        const index = rankedArray.indexOf(choice);
        let points = rankedArray.length - index;
        return points;
      };

      //req.body.rankedChoices = [3,1,2]
      req.body.rankedChoices.forEach(choiceID => {
        const newVote = {
          choice_id: choiceID,
          vote_weight: calculateVoteWeight(choiceID, req.body.rankedChoices),
          name_id: db.rows[0].id
        };
        createNewVote(newVote);
      });

    });


});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
