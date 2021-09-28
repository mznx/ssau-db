import React, {useState} from 'react'

function RecipeItem(props) {
    const [click, setclick] = useState(false);


    return (
        <div>
            {
                click == true?  <div><label onClick={() => click? setclick(false): setclick(true)}> {props.name} </label>
                <div className="Recipte">{props.recept}</div></div> : <label onClick={() => click? setclick(false): setclick(true)}> {props.name} </label>
            }
            
        </div>
    )
}

export default RecipeItem
