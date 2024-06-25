const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const localConfig = {
  user: process.env.USER ,
  host:process.env.HOST ,
  database:process.env.DATABASE ,
  port:process.env.PORT,
};

const remoteConfig = {
  user: process.env.PGSQLUSER ,
  host:process.env.PGSQLHOST ,
  database:process.env.PGSQLDATABASE ,
  port:process.env.PGSQLPORT,
  password:process.env.PGSQLPASSWORD 
};



const pool = new Pool(remoteConfig);

module.exports = pool;
