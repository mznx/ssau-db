import React from 'react'
import classes from './IngredientItem.module.css'


function IngredientItem(props) {
  return (
    <div className={classes.IngredientItem}>
      <label>
        <input type="checkbox" className={classes.checkbox} checked={props.checked} onClick={
          props.checked === true ?
          
          () => props.removeid({name: 'ingredient', id: props.id})
          :
          () => props.getid({name: 'ingredient', id: props.id})

          }/>
        {props.name}
      </label>
    </div>
  )
}


export default IngredientItem