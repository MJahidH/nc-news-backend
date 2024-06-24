const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const config = {
  user: process.env.USER ,
  host:process.env.HOST ,
  database:process.env.DATABASE ,
  port:process.env.PORT,
};

const pool = new Pool(config);

module.exports = pool;
