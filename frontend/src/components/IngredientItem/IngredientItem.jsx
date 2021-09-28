import React from 'react'

function IngredientItem(props) {
    debugger;
    return (
        <div>
            <label>
                <input type="checkbox" />
                {props.name}
            </label>
        </div>
    )
}

export default IngredientItem
