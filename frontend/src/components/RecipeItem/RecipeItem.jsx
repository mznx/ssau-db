import React, {useState, useEffect} from 'react'
import axios from 'axios';

function RecipeItem(props) {


    const [portions, setportions] = useState(1)

    const [click, setclick] = useState(false);

    const [recept, setrecept] = useState([]);

    const [text, settext] = useState(" ");


    useEffect(() => {
        axios.get(`http://localhost:5000/recipes/${props.id}`)
    .then(response => {
        setrecept(response.data)
    })
      }, [setrecept])

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

    const clickName = () => {
        if (click === true) {
            setclick(false)
        }
        else {
            setclick(true)
            postinText()
        }

    }


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
        <div>
            {
                click === true? 
            
                <div>
                <label onClick={() => clickName()}> {props.name} </label>
                <button onClick={() => incrementPortions(portions + 1)}>+</button>
                <button onClick={() => decrementPortions(portions - 1)}>-</button>
                <div>количество порций {portions}</div>
                <div className="Recipte">Рецепт: {text}</div>
                </div> 
                : 
                <label onClick={() => clickName()}> {props.name} </label>
            }
            
        </div>
    )
}

export default RecipeItem
