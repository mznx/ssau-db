import React, {useState, useEffect} from 'react';
import './App.css';
import IngredientItem from './components/IngredientItem/IngredientItem';
import RecipeItem from './components/RecipeItem/RecipeItem';
import axios from "axios";


function App() {
  
  const [recipe, setrecipe] = useState([])
  const [ingredients, setingredients] = useState([])
  const [categories, setcategories] = useState([])
  const [state, setstate] = useState(1)

//Запрос всех рецептов
  useEffect(() => {
    console.log('get rec');
    axios.get("http://localhost:5000/recipes")
    .then(response => 
      setrecipe(response.data))
  }, [setrecipe])

//Запрос всех категорий
  useEffect(() => {
    console.log('get cat');
    axios.get("http://localhost:5000/categories")
    .then(response => 
      setcategories(response.data))
  }, [setcategories])

//Запрос всех ингредиентов
  useEffect(() => {
    console.log('get ingr');
    axios.get("http://localhost:5000/ingredients")
    .then(response => 
      setingredients(response.data))
  }, [setingredients])

  function logi() {
    console.log(recipe);
    console.log(categories);
    console.log(ingredients);
  }

return (
  <div className="App">
  <h1 className="title" onClick={() => {logi()}}>Кулинарная книга рецептов</h1>

  <div onClick={()=> setstate(state + 1)}>{state}</div>

  <div className="Listsof">

      <div className="categoryList">
        {categories.map( (item) => {
         return(<IngredientItem name={item.name} id={item.id} className="CategoryItem"/>)
        })}
      </div>

      <div className="IngrList">
        {ingredients.map( (item) => {
         return(<IngredientItem name={item.name} id={item.id} className="IngrItem"/>)
        })}
      </div>

      <div className="RecipesList">
        {
          recipe.map( (item) => {
            return(
              <RecipeItem name={item.name} id={item.id} className="RecipeItem"/>
            )
          })
        }
      </div>
    </div> 

  </div>
  )
}

export default App
