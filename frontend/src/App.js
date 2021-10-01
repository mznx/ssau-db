import React, {useState, useEffect} from 'react';
import './App.css';
import IngredientItem from './components/IngredientItem/IngredientItem';
import RecipeItem from './components/RecipeItem/RecipeItem';
import axios from "axios";


function App() {
  
  const [recipe, setrecipe] = useState([])



  useEffect(() => {
    axios.get("http://localhost:5000/recipes")
    .then(response => 
      setrecipe(response.data))
  }, [setrecipe])

  const Ingredienst = [
    { title: "Томаты", id: 1},
    { title: "Огурцы", id: 2}
  ]


  function logi() {
    console.log(recipe);
  }

return (
    <div className="App">
      <h1 onClick={() => {logi()}}>Кулинарная книга рецептов</h1>

      
      <div className="IngrList">
        {Ingredienst.map( (item) => {
         return(<IngredientItem name={item.title} id={item.id}/>)
        })}
      </div>

      <div className="RecipesList">
        {
          recipe.map( (item) => {
            return(
              <RecipeItem name={item.name} id={item.id}/>
            )
          })
        }
      </div>
      

    </div>
  )
}

export default App
