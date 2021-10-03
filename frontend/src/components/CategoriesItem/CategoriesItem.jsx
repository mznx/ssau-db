import React, {useState} from 'react'

function CategoriesItem(props) {

   const [click, setclick] = useState(false);


    return (

        <div >


            <label >
                <input type="checkbox" onClick={
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
