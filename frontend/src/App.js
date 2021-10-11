import React, {useState, useEffect} from 'react';
import axios from "axios";
import IngredientItem from './components/IngredientItem/IngredientItem';
import RecipeItem from './components/RecipeItem/RecipeItem';
import CategoryItem from './components/CategoryItem/CategoryItem';
import './App.css';


// массив всех категорий и ингредиентов по айди
var filterRequest = []
var allIngr = []


function App() {
  const [recipes, setrecipes] = useState([])
  const [ingredients, setingredients] = useState([])
  const [categories, setcategories] = useState([])

  //Запрос всех рецептов
  useEffect(() => {
    console.log('get rec')
    axios.get("http://localhost:5000/recipes")
    .then(response =>
      setrecipes(response.data)
    )
  }, [])

  //Запрос всех категорий
  useEffect(() => {
    console.log('get cat')
    axios.get("http://localhost:5000/categories")
    .then(response =>
      setcategories(response.data)
    )
  }, [])

  //Запрос всех ингредиентов
  useEffect(() => {
    console.log('get ingr')
    axios.get("http://localhost:5000/ingredients")
    .then(response => {
      allIngr = response.data
      setingredients(response.data)
    })
  }, [])

  //получение id и добавление в массив
  const getid = (idAdd) => {
    filterRequest.push(idAdd)
    filterReqFun(filterRequest)
  }

  //получение id и удаление из массива
  const removeid = (idRemove) => {  
    filterRequest.forEach( (element, index) => {
      if ((element.name === idRemove.name) && (element.id === idRemove.id)) {
        filterRequest.splice(index, 1)
      }
    });

    filterReqFun(filterRequest)
  }

  /*Функция превращающая массив id категорий и id ингредиентов
   в строку и делающая запрос на сервер в зависимости от условия
   существования ингредиентов или категорий в массиве */

  const filterReqFun = (filter) => {
    let ListOfCategories = []
    let ListOfIngredients = []

    filter.forEach(element => {
      if (element.name === 'category') {
        ListOfCategories.push(element.id)
      } else {
        ListOfIngredients.push(element.id)
      }
    })

    let url
    let categories = ListOfCategories.join(',')
    let ingredients = ListOfIngredients.join(',')
    
    if ( ListOfCategories.length === 0 && ListOfIngredients.length === 0 ) {
      url = `http://localhost:5000/recipes`
    } else if ( ListOfCategories.length === 0 ) {
      url = `http://localhost:5000/recipes?ingredients=${ingredients}`
    } else if ( ListOfIngredients.length === 0 ) {
      url = `http://localhost:5000/recipes?categories=${categories}`
    } else {
      url = `http://localhost:5000/recipes?categories=${categories}&ingredients=${ingredients}`
    }

    axios.get(url)
    .then(response => {
      const recipes = response.data
      
      addIngredientsIdtoFilterList(recipes)
      setrecipes(recipes)
    })
  }

  //функция, отображающая только имеющие смысл ингредиенты
  const addIngredientsIdtoFilterList = (recipes) => {
    let ingrData = []
  
    //заношу все id ингредиентов в ingrData
    recipes.forEach( element => {
      let ids = element.ingredients
      ids = ids.split(',')
  
      ids.forEach( id => {
        ingrData.push(Number(id))
      })
    })
  
    //убираю повторяющиеся 
    ingrData = ingrData.filter(function(item, pos) {
      return ingrData.indexOf(item) === pos;
    })

    let filteredListOfIngredients = []
    allIngr.forEach( element => {
      ingrData.forEach( id => {
        if ( element.id === id ) {
          filteredListOfIngredients.push(element)
        }
      })
    })

    //заношу ингредиенты которые имеет смысл отображать
    setingredients(filteredListOfIngredients)
  }

  //вывод ответов в консоль
  const logi = () => {
    console.log(recipes);
    console.log(categories);
    console.log(ingredients);
  }

  return (
    <div className="App">
      <h1 className="title" onClick={() => logi()}>Кулинарная книга рецептов</h1>

      <div className="Listsof">
        <div className="categoryList">
          <h3 className="ListTitle">Список категорий</h3>
          {categories.map(item => {
            return(<CategoryItem name={item.name} id={item.id} getid={getid} removeid={removeid}/>)
          })}
        </div>
        
        <div className="IngrList">
          <h3 className="ListTitle">Список ингредиентов</h3>
          {ingredients.map(item => {
            return(<IngredientItem name={item.name} id={item.id} getid={getid} removeid={removeid}/>)
          })}
        </div>
        
        <div className="RecipesList">
          <h3 className="ListTitle">Список рецептов</h3>
          {recipes.map(item => {
              return(<RecipeItem name={item.name} id={item.id}/>)
          })}
        </div>
      </div>
  
    </div>
  )
}


export default App