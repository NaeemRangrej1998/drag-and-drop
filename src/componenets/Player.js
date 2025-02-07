import React from "react";
import { ListGroup } from "react-bootstrap";
import { useDrag } from "react-dnd";

const Player = ({ item, type, index, onDropPlayer }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: type,
        item: () => {
            console.log("Dragging:", item);
            return { ...item, index };
        },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (dropResult && item) {
                onDropPlayer(item);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <ListGroup.Item ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1, cursor: "grab" }}>
            {item.name}
        </ListGroup.Item>
    );
};

export default Player;
