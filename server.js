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
const mailgunAPI = require("./mailgun.js")


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

/* //Not using?
app.get("/polls/new", (req, res) => {
  res.render("poll_form");
}); */

app.get("/polls/:id", (req, res) => {

  getChoicesFromPollLink(req.params.id)
  .then((response) => {
    console.log("RESPONSE**:", response);

    const templateVars = {
      potato: response,
      poll_id: req.params.id,
    }
    res.render("show_poll", templateVars);
  })

});

const getPollIdFromPollLink = async(link) => {
  return db.query(`
    SELECT * FROM polls
    WHERE poll_link = $1;
  `, [link])
    .then(res => res.rows[0])
    .catch(err => console.log(err));
};


app.get("/share/:id", (req, res) => {
  // write the select queries after getting the id from the parents.
  // templateVars for the poll
  let pollLink = req.params.id;
  getAdminLink(pollLink).then(poll => {
    //console.log("Testing poll:", poll);
    let adminLink = poll.admin_link
    let templateVars = {
      pollLink,
      adminLink,
    }
    res.render("links_share", templateVars);
  })
});

app.get("/results/:id", (req, res) => {
  let adminLink = req.params.id;
  console.log("This should be the admin link:", req.params.id )

  getResultsFromAdminLink(adminLink)
  .then( response => {
    console.log("This should post the results ****", response);

    const templateVars = {
      response
    }


    res.render("poll_result", templateVars);
  });






});

//DATABASE SELECT FUNCTION (not done)
/* const getChoiceId = (s) => {
  return db
    .query(`SELECT * FROM choices
    WHERE poll_link = $1;`,
    [pollLink])
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
}; */

//DELETE? DATABSE SELECTION FUNCTION using admin link (choice and description)
const getResultsFromAdminLink = async (pollId) => {

  return db.query(`
    SELECT title AS choice, sum(votes.vote_weight)
    FROM votes JOIN choices ON choice_id = choices.id JOIN polls ON poll_id = polls.id
    WHERE admin_link = $1
    GROUP BY choices.title, polls.id
    ORDER BY sum(votes.vote_weight) DESC;
  `, [pollId])
    .then(res => res.rows)
    .catch(err => console.log(err));

};



//DATABSE SELECTION FUNCTION using poll link (choice and description)
const getChoicesFromPollLink = async (pollId) => {
  return db.query(`
    SELECT choices.id, title AS choice, choices.description, polls.question
    FROM choices JOIN polls ON poll_id = polls.id
    WHERE poll_link = $1 GROUP BY choices.id, choices.title, polls.id, choices.description
  `, [pollId])
    .then(res => res.rows)
    .catch(err => console.log(err));
};

getChoicesFromPollLink(1)
.then((res) => console.log(res));

//DATABASE SELECT FUNCTION
const getAdminLink = (pollLink) => {
  return db
    .query(`SELECT * FROM polls
    WHERE poll_link = $1;`,
    [pollLink])
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
};

//DATABASE FUNCTION
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

//DATABASE FUNCTION
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

  const pollLink = generateRandomString();
  const adminLink = generateRandomString();

  mailgunAPI(req.body.email, pollLink, adminLink);

  const newPoll = {
    email_address: req.body.email,
    question: req.body.question,
    anonymous: false,
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


//DATABASE FUNCTION: Insert into vote table
const createNewVote = (newVote) => {
  const {choice_id, vote_weight, name_id} = newVote;
  return db
    .query(`
    INSERT INTO votes (choice_id, vote_weight, name_id)
    VALUES ( $1, $2 , $3)
    RETURNING *;
    `,[choice_id, vote_weight, name_id])
    .then((result) => console.log("new vote in database:", result.rows[0]))
    .catch((err) => {
      console.log(err.message);
    });
};

app.post("/polls/:id", (req, res) => {
  //console.log("req.body:", req.body);
  //console.log("req.params:", req.params.id);
  res.status(200).send("ok");

  //console.log("i want the array:", req.body.rankedChoices)

  //Calculates vote weight of every choice from ranked list
  const calculateVoteWeight = (choice, rankedArray) => {
    const index = rankedArray.indexOf(choice);
    points = rankedArray.length - index;
    return points;
  }

  //req.body.rankedChoices = [3,1,2]
  req.body.rankedChoices.forEach( choiceID => {
    const newVote = {
      choice_id: choiceID,
      vote_weight: calculateVoteWeight(choiceID, req.body.rankedChoices),
      name_id: 1,
    };
    createNewVote(newVote);
  })

});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
