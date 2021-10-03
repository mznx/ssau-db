import React from 'react'

function CategoriesItem(props) {
    return (
        <div className={props.className}>
            <label>
                <input type="checkbox" />
                {props.name}
            </label>
        </div>
    )
}

export default CategoriesItem
