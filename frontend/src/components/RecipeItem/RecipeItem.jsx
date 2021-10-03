import React, {useState, useEffect} from 'react'
import axios from 'axios';
import classes from './RecipeItem.module.css';

function RecipeItem(props) {


    const [portions, setportions] = useState(1)

    const [click, setclick] = useState(false);

    const [recept, setrecept] = useState([]);

    const [text, settext] = useState(" ");

    //запрос конкретного рецепта по id
    useEffect(() => {
        axios.get(`http://localhost:5000/recipes/${props.id}`)
    .then(response => {
        setrecept(response.data)
    })
      }, [setrecept])

    //парсер текста по ингредиентам
      const postinText = (por = 1) => {

        if (recept.length != 0){
        
            console.log(por);

            let ingredients = recept[0].ingredients

            let text = recept[0].text

            text = text.split(' ')


            text.forEach( (item, i) => {
	
                ingredients.forEach((element) => {
  		            if( `{${element.id}}` == item ){
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
        }
        else {
            setclick(true)
            postinText()
        }

    }

    //инкремент, декремент количества порций
    const incrementPortions = (por) => {
        console.log(por)
        postinText(por)
        setportions(por)
    }

    const decrementPortions = (por) => {
        if (por >= 1){
        postinText(por)
        setportions(por)
        }
    }

    return (
        <div >
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
