const { Pool } = require("pg");
const dbParams = require("../lib/db");
const db = new Pool(dbParams);
db.connect();

const { getResultsFromAdminLink } = require("../db/queries/dbFunctions");

module.exports = (req, res) => {
  let adminLink = req.params.id;
  console.log("This should be the admin link:", req.params.id )

  getResultsFromAdminLink(adminLink)
    .then( response => {
      console.log("BEFORE:", response);

      const obj = response[0];
      //Default being length of responses array for case of all sums are equal
      let trackIndex = response.length;
      for (let i = 1; i < response.length; i++) {
        if (obj.sum !== response[i].sum) {
          trackIndex = i;
          break;
        }
        let newString = obj.choice + ", " + response[i].choice;
        obj.choice = newString;
      }
      response.splice(0, trackIndex, obj);

      console.log("AFTER RESPONSE:", response);

      const templateVars = {
        response
      }
      return templateVars
    })
    .then(templateVars => {
      db.query(`
      SELECT DISTINCT names.* FROM names JOIN votes ON name_id = names.id
      JOIN choices ON choice_id = choices.id
      JOIN polls ON poll_id = polls.id WHERE polls.admin_link = $1;
      `,[adminLink])
        .then(res => {
          console.log(res.rows)
          return res.rows;
        })
        .then((rows) => {
          templateVars.names = rows;
          res.render("poll_result", templateVars)
        }
        );
    });
};
