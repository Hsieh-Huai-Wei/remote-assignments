const mysql = require("mysql2");
const dbConnection = mysql
  .createPool({
    host: "localhost", // MYSQL HOST NAME
    user: "root", // MYSQL USERNAME
    password: "abc123", // MYSQL PASSWORD
    database: "assignment", // MYSQL DB NAME
  })
  .promise();
module.exports = dbConnection;
