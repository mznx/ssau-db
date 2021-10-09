const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const db = require('./db.js');


app.use(cors());


// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));


// получить список рецептов по параметрам
app.get('/recipes', (req, res) => {
  let params = req.query;
  
  if (!params.hasOwnProperty('categories') && !params.hasOwnProperty('ingredients')) {
    // select all
    var result = db.getAllRecipes();
  
  } else if (!params.hasOwnProperty('categories')) {
    // select by ingredients
    const ingredients = params.ingredients.replace(/[^0-9]+/g, ',').replace(/^,|,$/g, ''); // очищаем ввод
    var result = db.getRecipesByIngs(ingredients);

  } else if (!params.hasOwnProperty('ingredients')) {
    // select by categories
    const categories = params.categories.replace(/[^0-9]+/g, ',').replace(/^,|,$/g, ''); // очищаем ввод
    var result = db.getRecipesByCats(categories);
  
  } else {
    // select by categories and ingredients
    const categories = params.categories.replace(/[^0-9]+/g, ',').replace(/^,|,$/g, ''); // очищаем ввод
    const ingredients = params.ingredients.replace(/[^0-9]+/g, ',').replace(/^,|,$/g, ''); // очищаем ввод
    var result = db.getRecipesByCatsAndIngs(categories, ingredients);
  }

  res.json(result);
});


// получить рецепт по id
app.get('/recipes/:id', (req, res) => {
  const id = req.params['id'];
  var result = db.getRecipeById(id);

  res.json(result);
});


// получить список всех категорий
app.get('/categories', (req, res) => {
  var result = db.getAllCategories();

  res.json(result);
});


// получить список всех ингредиентов
app.get('/ingredients', (req, res) => {
  var result = db.getAllIngredients();

  res.json(result);
});