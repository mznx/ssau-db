import React from 'react'
import classes from './CategoryItem.module.css'


function CategoryItem(props) {
  return (
    <div className={classes.CategoryItem}>
      <label>
        <input type="checkbox" className={classes.checkbox} checked={props.checked} onClick={
          props.checked === true ?

          () => props.removeid({name: 'category', id: props.id})
          :
          () => props.getid({name: 'category', id: props.id})
          
          }/>
        {props.name}
      </label>
    </div>
  )
}


export default CategoryItem