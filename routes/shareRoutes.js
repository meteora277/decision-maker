const { getAdminLink } = require("../db/queries/dbFunctions");

module.exports = (req, res) => {
  // write the select queries after getting the id from the parents.
  // templateVars for the poll
  let pollLink = req.params.id;
  getAdminLink(pollLink).then(poll => {
    let adminLink = poll.admin_link;
    let templateVars = {
      pollLink,
      adminLink,
    };
    res.render("links_share", templateVars);
  });
};
