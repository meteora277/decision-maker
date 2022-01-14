const { Pool } = require("pg");
const dbParams = require("../lib/db");
const db = new Pool(dbParams);
db.connect();

const { getResultsFromAdminLink } = require("../db/queries/dbFunctions");

module.exports = (req, res) => {
  let adminLink = req.params.id;
  console.log("This should be the admin link:", req.params.id);

  getResultsFromAdminLink(adminLink)
    .then(response => {
      console.log("This should post the results ****", response);
      const templateVars = {
        response
      };
      return templateVars;
    })
    .then(templateVars => {
      db.query(`
      SELECT DISTINCT names.* FROM names JOIN votes ON name_id = names.id
      JOIN choices ON choice_id = choices.id
      JOIN polls ON poll_id = polls.id WHERE polls.admin_link = $1;
      `,[adminLink])
        .then(res => {
          console.log(res.rows);
          return res.rows;
        })
        .then((rows) => {
          templateVars.names = rows;
          res.render("poll_result", templateVars);
        }
        );
    });
};
