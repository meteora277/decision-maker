// load .env data into process.env
require("dotenv").config();

/**
 * Makes a single API request to send an email to user.
*/

 var api_key = process.env.API_KEY;
 var domain = 'sandbox491a8df337a74dd78b4d40467c043b8f.mailgun.org';
 var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

 var data = {
   from: 'Excited User <me@samples.mailgun.org>',
   to: 'bita.janzadeh@hotmail.com',
   subject: 'Please work',
   text: 'Hey!! I hid my API key, does this work?'
 };

 mailgun.messages().send(data, function (error, body) {
   console.log(body);
 });
