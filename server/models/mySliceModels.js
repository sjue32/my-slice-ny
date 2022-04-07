const { Pool } = require('pg');

const PG_URI = 'postgres://kfrwhcas:aeRPnBDmXrPgH5-JZDqO1Bn4yZQMy2Zh@batyr.db.elephantsql.com/kfrwhcas';

// create a pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});

// Schema for database can be found here (NOT COMPLETE) - on to do list

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};

