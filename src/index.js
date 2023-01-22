const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const PORT = 3001;

function getNotes() {
  return JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
}

app.listen(PORT);

// eslint-disable-next-line no-console
console.info('Server on port', PORT);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(getNotes());
});

app.post('/api/notes', (req, res) => {
  const notes = getNotes();
  const newNote = {
    title: req.body.title,
    text: req.body.text,
  };
  notes.push(newNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.status(200).json({ message: 'Note saved' });
});

app.delete('/api/notes/:id', (req, res) => {
  const notes = getNotes();
  const newNotes = notes.filter((note) => note.id !== req.params.id);
  fs.writeFileSync('./db/db.json', JSON.stringify(newNotes));
  res.status(200).json({ message: 'Note deleted' });
});
