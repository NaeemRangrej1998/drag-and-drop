import React from "react";
function MovableItems({key,name,currentColumnName,setItems,index}) {
    console.log({key,name,currentColumnName,setItems,index})
    return (
        <div className="movable-item" >
            {name}
        </div>
    );
}

export default MovableItems;
