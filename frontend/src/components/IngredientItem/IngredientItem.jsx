import React, {useState} from 'react'
import classes from './IngredientItem.module.css'


function IngredientItem(props) {
  const [click, setclick] = useState(false)

  return (
    <div className={classes.IngredientItem}>
      <label>
        <input type="checkbox" className={classes.checkbox} onClick={
          click?
          
          () => {
            props.removeid({name: 'ingredient', id: props.id})
            setclick(false)
          }

          :
          
          () => {
            props.getid({name: 'ingredient', id: props.id})
            setclick(true)
          }

          }/>
        {props.name}
      </label>
    </div>
  )
}


export default IngredientItem