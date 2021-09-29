const express = require('express');
const app = express();
const port = process.env.PORT || 5000;


try {
  var db = require('better-sqlite3')('app.db', {'readonly': true});
} catch {
  console.log('Failed to connect to the database, check that the required file exists.');
  process.exit();
}


// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));


// получить рецепты по параметрам
app.get('/recipes', (req, res) => {
  let params = req.query;
  
  if (!params.hasOwnProperty('categories') && !params.hasOwnProperty('ingredients')) {
    // select all
    var result = db.prepare(`
                            SELECT Recipes.Recipes_id AS id, Recipes.Name AS name, Categories.Name AS category
                            FROM Recipes
                            JOIN Categories ON Recipes.Categories_id = Categories.Categories_id
                            `).all();
  
  } else if (!params.hasOwnProperty('categories')) {
    // select by ingredients
    const ingredients = params.ingredients.replace(/[^0-9]+/g, ',').replace(/^,|,$/g, ''); // очищаем ввод
    var result = db.prepare(`
                            SELECT Recipes.Recipes_id AS id, Recipes.Name AS name, Categories.Name AS category
                            FROM Recipes
                            JOIN Categories ON Recipes.Categories_id = Categories.Categories_id
                            WHERE Recipes_id IN (
                              SELECT Recipes_id
                              FROM IngredientsRecipes
                              WHERE Ingredients_id IN (${ingredients}))
                            `).all();

  } else if (!params.hasOwnProperty('ingredients')) {
    // select by categories
    const categories = params.categories.replace(/[^0-9]+/g, ',').replace(/^,|,$/g, ''); // очищаем ввод
    var result = db.prepare(`
                            SELECT Recipes.Recipes_id AS id, Recipes.Name AS name, Categories.Name AS category
                            FROM Recipes
                            JOIN Categories ON Recipes.Categories_id = Categories.Categories_id
                            WHERE Recipes.Categories_id IN (${categories})
                            `).all();
  
  } else {
    // select by categories and ingredients
    const categories = params.categories.replace(/[^0-9]+/g, ',').replace(/^,|,$/g, ''); // очищаем ввод
    const ingredients = params.ingredients.replace(/[^0-9]+/g, ',').replace(/^,|,$/g, ''); // очищаем ввод
    var result = db.prepare(`
                            SELECT Recipes.Recipes_id AS id, Recipes.Name AS name, Categories.Name AS category
                            FROM Recipes
                            JOIN Categories ON Recipes.Categories_id = Categories.Categories_id
                            WHERE Recipes.Categories_id IN (${categories})
                            AND Recipes_id IN (
                              SELECT Recipes_id
                              FROM IngredientsRecipes
                              WHERE Ingredients_id IN (${ingredients}))
                            `).all();
  }

  res.json(result);
});


// получить рецепт по id
app.get('/recipes/:id', (req, res) => {
  // select by id
  var id = req.params['id'];
  var result = db.prepare(`
                          SELECT Recipes.Recipes_id AS id, Recipes.Name AS name, Categories.Name AS category, Recipes.Text AS text
                          FROM Recipes
                          JOIN Categories ON Recipes.Categories_id = Categories.Categories_id
                          WHERE Recipes_id = ?
                          `).all(id);

  res.json(result);
});


// получить категории
app.get('/categories', (req, res) => {
  // select all
  var result = db.prepare(`
                          SELECT Categories.Categories_id AS id, Categories.Name AS name
                          FROM Categories
                          `).all();

  res.json(result);
});


// получить ингредиенты
app.get('/ingredients', (req, res) => {
  // select all
  var result = db.prepare(`
                          SELECT Ingredients.Ingredients_id AS id, Ingredients.Name AS name
                          FROM Ingredients
                          `).all();

  res.json(result);
});