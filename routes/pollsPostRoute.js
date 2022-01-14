/* eslint-disable camelcase */

const {mailgunPollEmail} = require("../mailgun");
const generateRandomString = require("../lib/generateRandomString");
const { createNewChoice, createNewPoll } = require("../db/queries/dbFunctions");

module.exports = (req, res) => {

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
};
