const mysql = require("mysql2");
require('dotenv').config()
const connectDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PW,
  database: "company_db"
},
console.log('Connected to Company Database.')
);

connectDB.connect(function (err) {
  if (err) throw err;
});

module.exports = connectDB;