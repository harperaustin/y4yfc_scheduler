import React, { useState } from "react";
import "./styles.css"; // Import your CSS file

const Calendar = () => {
  // Set the number of rows and columns
    const rows = 32;
    const cols = 8;
    // NEED TO ADD THE LABELS TO EDGES
  // Generate the grid as an array of rectangles

    const timeLabels = [
        "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM",
        "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
        "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", 
        "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM",
        "9:00 PM",
    ]

    const dayLabels = [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ]

    const [clickedRectangles, setClickedRectangles] = useState(Array(rows).fill(Array(cols).fill(false)));
    const [isMouseDown, setIsMouseDown] = useState(false);

    const handleClick = (row, col) => {
        setClickedRectangles(prev => {
            const newRectangles = prev.map(row => [...row]); // Create a copy of the current state
            newRectangles[row][col] = !newRectangles[row][col]; // Toggle clicked state
        return newRectangles;
        });
    };

    const handleMouseDown = (row, col) => {
        setIsMouseDown(true);
        handleClick(row, col); // Click the rectangle
    };
    
    const handleMouseEnter = (row, col) => {
        if (isMouseDown) {
          handleClick(row, col); // Click the rectangle if mouse is down
        }
    };
    
    const handleMouseUp = () => {
        setIsMouseDown(false); // Release the mouse
    };

    const today = new Date();
    const currentDay = today.getDay();

  const grid = Array.from({ length: rows * cols }, (_, index) => {
    const row = Math.floor(index / cols);  // Calculate the row index
    const col = index % cols;              // Calculate the column index
    const date = new Date(today)
    date.setDate(today.getDate() + (col - 1))

    let backgroundColor;
    if (row === 0 || col === 0) {
      backgroundColor = "#d3d3d3"; // Grey for first row and column
    } else {
        backgroundColor = clickedRectangles[row][col] ? "#90EE90" : "#FFFFFF"; // White for other rectangles
    }

    return (
    <div key={index}
    className="rectangle" 
    style={{backgroundColor}} 
    
    onMouseDown={() => handleMouseDown(row, col)}
    onMouseEnter={() => handleMouseEnter(row,col)}
    onMouseUp={handleMouseUp}
    >
        {((col === 0 && row !== 0) && (
            <span className="label">{timeLabels[row - 1]}</span>
        )) || ((row === 0 && col !== 0) && (
            <div>
                <span className="label">{dayLabels[(col - 2 + currentDay) % 7]}</span>
                <span className="label"> {date.toLocaleDateString(undefined, {month:"numeric", day: 'numeric'})} </span>
            </div>
            ))
        }
    </div>
    );
});

    return <div className="grid-container">{grid}</div>;
};

export default Calendar;