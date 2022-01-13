/* eslint-disable camelcase */
const { Pool } = require("pg");
const dbParams = require("../../lib/db");
const db = new Pool(dbParams);
db.connect();

const getResultsFromAdminLink = async(pollId) => {

  return db.query(`
    SELECT title AS choice, sum(votes.vote_weight)
    FROM votes JOIN choices ON choice_id = choices.id
    JOIN polls ON poll_id = polls.id
    WHERE admin_link = $1
    GROUP BY choices.title, polls.id
    ORDER BY sum(votes.vote_weight) DESC;
  `, [pollId])
    .then(res => res.rows)
    .catch(err => console.log(err));

};

//HELPER FUNCTION to send notification email
const getLinksFromChoiceID = async(choiceID) => {

  return db.query(`
    SELECT admin_link, poll_link, email_address
    FROM choices
    JOIN polls ON poll_id = polls.id
    WHERE choices.id = $1
    LIMIT 1
  `, [choiceID])
    .then(res => res.rows)
    .catch(err => console.log(err));
};


//DATABSE SELECTION FUNCTION using poll link (choice and description)
const getChoicesFromPollLink = async(pollId) => {
  return db.query(`
    SELECT choices.id, title AS choice, choices.description, polls.question, anonymous
    FROM choices JOIN polls ON poll_id = polls.id
    WHERE poll_link = $1 GROUP BY choices.id, choices.title, polls.id, choices.description
  `, [pollId])
    .then(res => res.rows)
    .catch(err => console.log(err));
};

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
const createNewPoll = async(poll) => {
  const {email_address, question, anonymous, admin_link, poll_link, is_active} = poll;
  return db
    .query(`INSERT INTO polls (email_address, question, admin_link, poll_link, is_active, anonymous)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *; `,
    [email_address, question, admin_link, poll_link, is_active, anonymous])
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message, '203');
    });
};

//DATABASE FUNCTION
const createNewChoice = async(choice) => {
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

module.exports = {
  getResultsFromAdminLink,
  getLinksFromChoiceID,
  getChoicesFromPollLink,
  getAdminLink,
  createNewPoll,
  createNewChoice,
};
