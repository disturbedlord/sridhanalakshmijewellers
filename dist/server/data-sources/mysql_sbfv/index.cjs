"use strict";
const server = require("@kottster/server");
const knex = require("knex");
const client = knex({
  client: "mysql2",
  connection: {
    host: "gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
    port: 4e3,
    user: "4JrnMtTzLHcYByF.root",
    password: "y8vw7WBD2WWiTzJI",
    database: "dljs",
    ssl: {
      rejectUnauthorized: true
    }
  }
});
const index = new server.KnexMysql2Adapter(client);
module.exports = index;
