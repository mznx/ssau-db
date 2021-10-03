import React, {useState} from 'react'
import classes from './CategoriesItem.module.css';

function CategoriesItem(props) {

   const [click, setclick] = useState(false);


    return (

        <div className={classes.CategoryItem}>

            <label >
                <input  className={classes.checkbox} type="checkbox" onClick={
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

export default CategoriesItem
