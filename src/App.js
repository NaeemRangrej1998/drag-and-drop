import React, { useState } from "react";
import Column from "./DragAndDrop/Column";
import MovableItem from "./DragAndDrop/MovableItem";
import { COLUMN_NAMES } from "./dragAndDrop/constants";
import { tasks } from "./dragAndDrop/task";
import "./assets/styles/App.css";
const App = () => {
    const [items, setItems] = useState(tasks);

    const moveCardHandler = (dragIndex, hoverIndex) => {
        const dragItem = items[dragIndex];

        if (dragItem) {
            setItems((prevState) => {
                const copiedState = [...prevState];
                copiedState.splice(hoverIndex, 1, dragItem);
                copiedState.splice(dragIndex, 1, prevState[hoverIndex]);
                return copiedState;
            });
        }
    };

    const returnItemsForColumn = (columnName) => {
        return items
            .filter((item) => item.column === columnName)
            .map((item, index) => (
                <MovableItem
                    key={item.id}
                    name={item.name}
                    currentColumnName={item.column}
                    setItems={setItems}
                    index={index}
                    moveCardHandler={moveCardHandler}
                />
            ));
    };
    return (
            <div className="container">
                {Object.values(COLUMN_NAMES).map((column) => (
                    <Column key={column} title={column} className="column">
                        {returnItemsForColumn(column)}
                    </Column>
                ))}

            </div>
    );
};

export default App;

