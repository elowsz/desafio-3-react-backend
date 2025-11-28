const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// CREATE
app.post('/items', (req, res) => {
  const { name, description } = req.body;
  db.run(`INSERT INTO items (name, description) VALUES (?, ?)`, [name, description], function(err){
    if(err) return res.status(500).send(err.message);
    res.json({ id: this.lastID, name, description });
  });
});

// READ
app.get('/items', (req, res) => {
  db.all(`SELECT * FROM items`, [], (err, rows) => {
    if(err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// UPDATE
app.put('/items/:id', (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  db.run(`UPDATE items SET name = ?, description = ? WHERE id = ?`, [name, description, id], function(err){
    if(err) return res.status(500).send(err.message);
    res.json({ id, name, description });
  });
});

// DELETE
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM items WHERE id = ?`, [id], function(err){
    if(err) return res.status(500).send(err.message);
    res.json({ message: 'Item deleted' });
  });
});

app.listen(3000, () => console.log('Backend rodando em http://localhost:3000'));
