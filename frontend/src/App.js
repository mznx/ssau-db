import React from 'react';
import './App.css';
import IngredientItem from './components/IngredientItem/IngredientItem';
import RecipeItem from './components/RecipeItem/RecipeItem';


function App() {

  const Ingredienst = [
    { title: "Томаты", id: 1},
    { title: "Огурцы", id: 2}
  ]

  const Recipes = [
    { name: "борщ", id: 1, recept: "Смешать хуйню всю"},
    { name: "салат", id: 2, recept: "Плову, потом кашачю жопу"}
  ]


  return (
    <div className="App">
      <h1>Кулинарная книга рецептов</h1>


      <div className="IngrList">
        {Ingredienst.map( (item) => {
         return(<IngredientItem name={item.title} id={item.id}/>)
        })}
      </div>

      <div className="RecipesList">
        {
          Recipes.map( (item) => {
            return(
              <RecipeItem name={item.name}  recept={item.recept} id={item.id}/>
            )
          })
        }
      </div>

    </div>
  )
}

export default App
