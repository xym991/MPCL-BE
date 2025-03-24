const mysql = require("mysql2");
const fs = require("fs");
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password123",
  database: process.env.DB_NAME || "mpcl",
  port: process.env.DB_PORT || 3306,
  ssl: {
    cert: fs.readFileSync(__dirname + "/ca.pem"),
    rejectUnauthorized: false, // Enf
  },
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the mpcl database.");
});

module.exports = db;
