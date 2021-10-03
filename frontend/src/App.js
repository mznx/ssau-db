import React, {useState, useEffect} from 'react';
import './App.css';
import IngredientItem from './components/IngredientItem/IngredientItem';
import RecipeItem from './components/RecipeItem/RecipeItem';
import axios from "axios";
import CategoriesItem from './components/CategoriesItem/CategoriesItem';


// массив всех категорий и ингредиентов по айди
var filterRequest = [

]

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
  }, [])

//Запрос всех категорий
  useEffect(() => {
    console.log('get cat');
    axios.get("http://localhost:5000/categories")
    .then(response => 
      setcategories(response.data))
  }, [])

//Запрос всех ингредиентов
  useEffect(() => {
    console.log('get ingr');
    axios.get("http://localhost:5000/ingredients")
    .then(response => 
      setingredients(response.data))
  }, [])

//получение id и добавление в массив
  const getid = (idAdd) => {

    filterRequest.push(idAdd)
  
    let filter = filterRequest

    filterReqFun(filter)


  }

//получение id и удаление из массива
  const removeid = (idRemove) => {
    
    filterRequest.forEach( (element, index) => {
      if ((element.name == idRemove.name) && (element.id == idRemove.id)){
        filterRequest.splice(index,1)
      }
    });

    let filter = filterRequest

    filterReqFun(filter)

  }

  /*Функция превращающая массив id категорий и id ингредиентов
   в строку и делающая запрос на сервер в зависимости от условия
   существования ингредиентов или категорий в массиве */

  const filterReqFun = (filter) => {

    let unfiltar = filter

    let ListOfCategories = []
    let ListOfIngredients = []


    unfiltar.forEach(element => {
      if (element.name == 'category'){
        ListOfCategories.push(element.id)
      }
      if (element.name == 'ingredients'){
        ListOfIngredients.push(element.id)
      }
    });


    let categoryes = ListOfCategories.join(',')
    let ingredients = ListOfIngredients.join(',')

    console.log(categoryes);
    console.log(ingredients);

    let data = {}
    
    if ( ListOfCategories.length == 0 && ListOfIngredients.length != 0 ){
      axios.get(`http://localhost:5000/recipes?ingredients=${ingredients}`)
      .then(response => {
      data = response.data
      setrecipe(data)
      }
      )
    }
    if ( ListOfCategories.length != 0 && ListOfIngredients.length == 0 ){
      axios.get(`http://localhost:5000/recipes?categories=${categoryes}`)
      .then(response =>{ 
      data = response.data
      setrecipe(data)
    })
      
    }
    if ( ListOfCategories.length != 0 && ListOfIngredients.length != 0 ){
      axios.get(`http://localhost:5000/recipes?categories=${categoryes}&ingredients=${ingredients}`)
      .then(response =>{ 
      data = response.data
      setrecipe(data)
    })
      
    }
    if ( ListOfCategories.length == 0 && ListOfIngredients.length == 0 ){
      axios.get(`http://localhost:5000/recipes`)
      .then(response =>{ 
      data = response.data
      setrecipe(data)
      })
      
    }

  }

//вывод ответов в консоль
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
        <h3 className="ListTitle">Список категорий</h3>
        {categories.map( (item) => {
         return(<CategoriesItem name={item.name} id={item.id} getid={getid} removeid={removeid}/>)
        })}
      </div>

      <div className="IngrList">
        <h3 className="ListTitle">Список ингредиентов</h3>
        {ingredients.map( (item) => {
         return(<IngredientItem name={item.name} id={item.id} getid={getid} removeid={removeid}/>)
        })}
      </div>

      <div className="RecipesList">
        <h3 className="ListTitle">Список рецептов</h3>
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
