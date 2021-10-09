const Database = require('better-sqlite3');


try {
  var db = new Database('app.db', {'readonly': true});
  console.log('Database connected successfully.');
} catch {
  console.log('Failed to connect to the database, check that the required file exists.');
  process.exit();
}


const getAllRecipes = () => {
  const sql_query = `
    SELECT Recipes.Recipes_id AS id, Recipes.Name AS name, Categories.Name AS category, Recipes.Categories_id AS category_id, GROUP_CONCAT(IngredientsRecipes.Ingredients_id) AS ingredients
    FROM Recipes
    JOIN Categories ON Recipes.Categories_id = Categories.Categories_id
    JOIN IngredientsRecipes ON Recipes.Recipes_id = IngredientsRecipes.Recipes_id
    GROUP BY Recipes.Recipes_id
  `;

  const result = db.prepare(sql_query).all();
  return result;
}


const getRecipesByIngs = (ingredients) => {
  const num_of_ingredients = new Set(ingredients.split(',')).size;
  const sql_query = `
    SELECT Recipes.Recipes_id AS id, Recipes.Name AS name, Categories.Name AS category, Recipes.Categories_id AS category_id, GROUP_CONCAT(IngredientsRecipes.Ingredients_id) AS ingredients
    FROM Recipes
    JOIN Categories ON Recipes.Categories_id = Categories.Categories_id
    JOIN IngredientsRecipes ON Recipes.Recipes_id = IngredientsRecipes.Recipes_id
    WHERE Recipes.Recipes_id IN (
      SELECT IngredientsRecipes.Recipes_id
      FROM IngredientsRecipes
      WHERE Ingredients_id IN (${ingredients})
      GROUP BY IngredientsRecipes.Recipes_id
      HAVING COUNT( DISTINCT Ingredients_id ) = ${num_of_ingredients})
    GROUP BY Recipes.Recipes_id
  `;

  const result = db.prepare(sql_query).all();
  return result;
}


const getRecipesByCats = (categories) => {
  const sql_query = `
    SELECT Recipes.Recipes_id AS id, Recipes.Name AS name, Categories.Name AS category, Recipes.Categories_id AS category_id, GROUP_CONCAT(IngredientsRecipes.Ingredients_id) AS ingredients
    FROM Recipes
    JOIN Categories ON Recipes.Categories_id = Categories.Categories_id
    JOIN IngredientsRecipes ON Recipes.Recipes_id = IngredientsRecipes.Recipes_id
    WHERE Recipes.Categories_id IN (${categories})
    GROUP BY Recipes.Recipes_id
  `;

  const result = db.prepare(sql_query).all();
  return result;
}


const getRecipesByCatsAndIngs = (categories, ingredients) => {
  const num_of_ingredients = new Set(ingredients.split(',')).size;
  const sql_query = `
    SELECT Recipes.Recipes_id AS id, Recipes.Name AS name, Categories.Name AS category, Recipes.Categories_id AS category_id, GROUP_CONCAT(IngredientsRecipes.Ingredients_id) AS ingredients
    FROM Recipes
    JOIN Categories ON Recipes.Categories_id = Categories.Categories_id
    JOIN IngredientsRecipes ON Recipes.Recipes_id = IngredientsRecipes.Recipes_id
    WHERE Recipes.Categories_id IN (${categories})
    AND Recipes.Recipes_id IN (
      SELECT IngredientsRecipes.Recipes_id
      FROM IngredientsRecipes
      WHERE Ingredients_id IN (${ingredients})
      GROUP BY IngredientsRecipes.Recipes_id
      HAVING COUNT( DISTINCT Ingredients_id ) = ${num_of_ingredients})
    GROUP BY Recipes.Recipes_id
  `;

  const result = db.prepare(sql_query).all();
  return result;
}


const getRecipeById = (id) => {
  const sql_query = `
    SELECT Recipes.Recipes_id AS id, Recipes.Name AS name, Categories.Name AS category, Recipes.Text AS text
    FROM Recipes
    JOIN Categories ON Recipes.Categories_id = Categories.Categories_id
    WHERE Recipes_id = ?
  `;

  const sql_query2 = `
    SELECT IngredientsRecipes_id AS id, Number AS number, Units.Name AS unit
    FROM IngredientsRecipes
    JOIN Units ON IngredientsRecipes.Units_id = Units.Units_id
    WHERE Recipes_id = ?
  `;

  var result = db.prepare(sql_query).all(id);

  if (result.length !== 0) {
    const ingredients = db.prepare(sql_query2).all(id);
    result[0].ingredients = ingredients;
  }
  
  return result;
}


const getAllCategories = () => {
  const sql_query = `
    SELECT Categories.Categories_id AS id, Categories.Name AS name
    FROM Categories
  `;

  const result = db.prepare(sql_query).all();
  return result;
}


const getAllIngredients = () => {
  const sql_query = `
    SELECT Ingredients.Ingredients_id AS id, Ingredients.Name AS name
    FROM Ingredients
  `;

  const result = db.prepare(sql_query).all();
  return result;
}


module.exports = {
  getAllRecipes,
  getRecipesByIngs,
  getRecipesByCats,
  getRecipesByCatsAndIngs,
  getRecipeById,
  getAllCategories,
  getAllIngredients
};