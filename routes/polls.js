/* eslint-disable camelcase */

// queries poll from link and renders show_poll with query data
const { getChoicesFromPollLink } = require("../db/queries/dbFunctions");
module.exports = (req, res) => {
  getChoicesFromPollLink(req.params.id)
    .then((response) => {
      console.log("RESPONSE**:", response);

      const templateVars = {
        potato: response,
        poll_id: req.params.id
      };
      res.render("show_poll", templateVars);
    });
};
