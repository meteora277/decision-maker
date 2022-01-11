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

const generateRandomString = function(length = 6) {
  let result  = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

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

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/polls/new", (req, res) => {
  res.render("poll_form");
});

app.get("/polls/:id", (req, res) => {
  res.render("show_poll");
});

app.get("/share/:id", (req, res) => {
  // write the select queries after getting the id from the parents.
  // templateVars for the poll
  res.render("links_share");

});

app.get("/results/:id", (req, res) => {
  res.render("poll_result");
});

// create body of the request with data from form.
// Work on auto gen values
// create poll attributes object (sep function two links)
//set result to poll_link
// if same func is used call it twice for admin link
// get annonymous param from body

const createNewPoll = (poll) => {
  const {email_address, question, anonymous, admin_link, poll_link, is_active} = poll;
  return db
    .query(`INSERT INTO polls (email_address, question, admin_link, poll_link, is_active, anonymous)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *; `,
    [email_address, question, admin_link, poll_link, is_active, anonymous])
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
};

const createNewChoice = (choice) => {
  const {poll_id, title, description} = choice;
  return db
    .query(`
    INSERT INTO choices (poll_id, title, description)
    VALUES ( $1, $2 , $3)
    RETURNING *;
    `,[poll_id, title, description])
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
};


app.post("/polls", (req, res) => {

  /*   console.log(Object.keys(req.body));
  console.log("email:", req.body.email, "title:", req.body.title0, "description:", req.body.description0) */

  // const keyArray = Object.keys(req.body)

  // keyArray.forEach( key => {
  //   req.body[key] =>
  // })

  const pollLink = generateRandomString();
  const adminLink = generateRandomString();

  const newPoll = {
    email_address: req.body.email,
    question: req.body.question,
    anonymous: false,
    admin_link: adminLink,
    poll_link: pollLink,
    is_active: true
  };

  console.log("New Poll:", newPoll);
  createNewPoll(newPoll)
    .then((createdPoll) => {

      let keys = Object.keys(req.body);
      let filteredTitles = [];

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
          title: title,
          description: filteredDescriptions[index]
        };
        createNewChoice(newChoice);
      });
      console.log(createdPoll, 'hewwo');
      console.log(filteredDescriptions);
      console.log(filteredTitles);

    });


});



app.post("/polls/:id", (req, res) => {
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
