const mysql = require("mysql2");

const connectDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tCarlson90",
  database: "employees"
},
console.log('Connected to Company Database.')
);

connectDB.connect(function (err) {
  if (err) throw err;
});

module.exports = connectDB;