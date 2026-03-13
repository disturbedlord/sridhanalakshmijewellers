// db.js
const mysql = require("mysql2");
const fs = require("fs");
require("dotenv").config();

conn = {};
switch (process.env.ENVIRONMENT) {
  case "DEV":
    conn = {
      host: "localhost",
      port: 3306, // or your database host
      user: "root", // MySQL username
      password: "rootpassword", // MySQL password
      database: "dljs", // Database name
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    };
    break;
  case "PROD":
    conn = {
      host: "gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
      port: 4000, // or your database host
      user: "4JrnMtTzLHcYByF.root", // MySQL username
      password: "y8vw7WBD2WWiTzJI", // MySQL password
      database: "dljs", // Database name
      ssl: {
        ca: fs.readFileSync("mysqlCert.pem"),
      },
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    };
}
// Create a connection to the database
const pool = mysql.createPool(conn);

module.exports = pool.promise(); // Returns a promise-based API
