const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');

const app = express();

app.get('/', (req, res) => {
  // console.log('hi from server', res);
  res.redirect('https://www.google.com');
});

app.listen(3000, () => {
  console.log('server listening on port 3000');
});
