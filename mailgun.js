// load .env data into process.env
require("dotenv").config();

/**
 * Makes a single API request to send an email to user.
*/
var api_key = process.env.API_KEY;
var domain = 'sandbox491a8df337a74dd78b4d40467c043b8f.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

const mailgunAPI = (email, pollLink, adminLink) => {

  var data = {
    from: 'Decision Maker <me@samples.mailgun.org>',
    to: `${email}`,
    subject: 'Here are your Decision Maker links!',
    html: ` <h2> Nice job on making a poll. \n Share this link with your friends today: Poll Link: http://localhost:8080/polls/${pollLink}
    \nView the vote results here: Admin Link: http://localhost:8080/results/${adminLink}\n Happy voting!! </h2>`
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
}

module.exports = mailgunAPI;
