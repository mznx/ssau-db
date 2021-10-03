import React,{useState} from 'react'


function IngredientItem(props) {
 
    const [click, setclick] = useState(false);

    return (
        <div>
            <label>
                <input type="checkbox" onClick={
                    click?
                   
                    () => {
                        props.removeid({name: 'ingredients', id: props.id})
                        setclick(false)
                    }

                    :
                    
                    () => {
                        props.getid({name: 'ingredients', id: props.id})
                        setclick(true)
                    }

                    
                    }/>
                {props.name}
            </label>
        </div>
    )
}

export default IngredientItem
