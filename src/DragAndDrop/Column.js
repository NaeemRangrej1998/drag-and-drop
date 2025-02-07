import React from "react";
import { useDrop } from "react-dnd";
import { COLUMN_NAMES } from "./constants";

const Column = ({ children, className, title }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "TASK",
        drop: () => ({ name: title }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const getBackgroundColor = () => {
        if (isOver) {
            return canDrop ? "rgb(188,251,255)" : "rgb(255,188,188)";
        }
        return "";
    };

    return (
        <div ref={drop} className={className} style={{ backgroundColor: getBackgroundColor() }}>
            <p>{title}</p>
            {children}
        </div>
    );
};

export default Column;
