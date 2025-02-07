import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const MovableItem = ({ name, index, currentColumnName, moveCardHandler, setItems }) => {
    const ref = useRef(null);

    const changeItemColumn = (currentItem, columnName) => {
        console.log("Call Changed Item")
        setItems((prevState) => {
            return prevState.map((task) =>
                task.name === currentItem.name ? { ...task, column: columnName } : task
            );
        });
    };

    const [, drop] = useDrop({
        accept: "TASK",
        hover(item, monitor) {
            if (!ref.current) return;

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;

            // const hoverBoundingRect = ref.current.getBoundingClientRect();
            // const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // const clientOffset = monitor.getClientOffset();
            // const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            //
            // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

            moveCardHandler(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: "TASK",
        item: { index, name, currentColumnName },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (dropResult) {
                changeItemColumn(item, dropResult.name);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <div ref={ref} className="movable-item" style={{ opacity: isDragging ? 0.4 : 1 }}>
            {name}
        </div>
    );
};

export default MovableItem;
