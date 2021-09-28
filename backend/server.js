const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// получить рецепты по параметрам
app.get('/recipes', (req, res) => {
  let params = req.query;
  
  if (!params.hasOwnProperty('categories') && !params.hasOwnProperty('ingredients')) {
    // select all
  } else if (!params.hasOwnProperty('categories')) {
    // select by ingredients
  } else if (!params.hasOwnProperty('ingredients')) {
    // select by categories
  } else {
    // select by categories and ingredients
  }

  res.json('response...');
});

// получить рецепт по id
app.get('/recipes/:id', (req, res) => {
  var id = req.params['id'];
  // select by id

  res.json('response...');
});