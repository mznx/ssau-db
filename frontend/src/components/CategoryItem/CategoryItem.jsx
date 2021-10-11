import React, {useState} from 'react'
import classes from './CategoryItem.module.css'


function CategoryItem(props) {
  const [click, setclick] = useState(false)

  return (
    <div className={classes.CategoryItem}>
      <label>
        <input type="checkbox" className={classes.checkbox} onClick={
          click?

          () => {
            props.removeid({name: 'category', id: props.id})
            setclick(false)
          }

          :

          () => {
            props.getid({name: 'category', id: props.id})
            setclick(true)
          }
          
          }/>
        {props.name}
      </label>
    </div>
  )
}


export default CategoryItem