const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT
  )`);
});

module.exports = db;
