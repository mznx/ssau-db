import React, {useState, useEffect} from 'react'
import axios from 'axios'
import classes from './RecipeItem.module.css'


function RecipeItem(props) {
  const [portions, setportions] = useState(1)
  const [click, setclick] = useState(false);
  const [recipe, setrecipe] = useState([]);
  const [text, settext] = useState('');

  //запрос конкретного рецепта по id
  useEffect(() => {
    axios.get(`http://localhost:5000/recipes/${props.id}`)
    .then(response => setrecipe(response.data))
  }, [setrecipe])

  //парсер текста по ингредиентам
  const postinText = (por = 1) => {
    if (recipe.length !== 0) {
      console.log(por);
      let ingredients = recipe[0].ingredients
      let text = recipe[0].text
      text = text.split(' ')
      text.forEach( (item, i) => {
        ingredients.forEach((element) => {
          if(`{${element.id}}` === item) {
            text[i] = `${element.number * por} ${element.unit}`
          }
        })
      })

      text = text.join(' ')
      settext(text)
    }
  }

  //онклик на скрытие - открытие текста рецепта
  const clickName = () => {
    if (click === true) {
      setclick(false)
    } else {
      setclick(true)
      postinText()
    }
  }

  //инкремент количества порций
  const incrementPortions = (por) => {
    console.log(por)
    postinText(por)
    setportions(por)
  }

  // декремент количества порций
  const decrementPortions = (por) => {
    if (por >= 1) {
      postinText(por)
      setportions(por)
    }
  }

  return (
    <div>
      {
        click === true?
      
        <div className={classes.RecipeItem}>
        <label onClick={() => clickName()}> {props.name} </label>
        <button className={classes.gradientbutton} onClick={() => incrementPortions(portions + 1)}>+</button>
        <button className={classes.gradientbutton} onClick={() => decrementPortions(portions - 1)}>-</button>
        <div className={classes.porcions}>количество порций: {portions}</div>
        <div className={classes.recipe}>Рецепт: {text}</div>
        </div>
        :
        <label className={classes.RecipeItem} onClick={() => clickName()}> {props.name} </label>
      }
    </div>
  )
}


export default RecipeItem