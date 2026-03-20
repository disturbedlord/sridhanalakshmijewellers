import { KnexMysql2Adapter } from '@kottster/server';
import knex from 'knex';

/**
 * Learn more at https://knexjs.org/guide/#configuration-options
 */
const client = knex({
  client: 'mysql2', 
  connection: {
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    port: 4000,
    user: '4JrnMtTzLHcYByF.root',
    password: 'y8vw7WBD2WWiTzJI',
    database: 'dljs',
    ssl: {
      rejectUnauthorized: true
    }
  }
});

export default new KnexMysql2Adapter(client);