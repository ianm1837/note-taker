const express = require('express');

const app = express();

app.listen(3000);

app.get('/', (req, res) => {
  res.render('./public/index.html');
});

app.get('/notes', (req, res) => {
  res.render('./public/notes.html');
});
