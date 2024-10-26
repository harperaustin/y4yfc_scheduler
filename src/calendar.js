import React, { useState, useEffect, useRef } from "react";
import "./styles.css"; 

const Calendar = () => {

  // Set the number of rows and columns
    const rows = 33;
    const cols = 8;
  // Generate the grid as an array of rectangles

    const timeLabels = [
        "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM",
        "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
        "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", 
        "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM",
        "9:00 PM", "9:30 PM"
    ]

    const dayLabels = [
        "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
    ]

    const [clickedRectangles, setClickedRectangles] = useState(Array(rows).fill(Array(cols).fill(false)));
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [initialDragState, setInitialDragState] = useState(null);
    const isDragging = useRef(false);

    const handleClick = (row, col) => {
        if (row > 1 && col > 0) { // Only handle clicks for the inner grid
            setClickedRectangles(prev => {
                const newRectangles = prev.map(row => [...row]); // Create a copy of the current state
                newRectangles[row][col] = !newRectangles[row][col]; // Toggle clicked state
                return newRectangles;
            });
        }
    };

    const handleMouseDown = (row, col) => {
        // console.log("Mouse Down: row %d, col %d", row, col)
        setIsMouseDown(true);
        setInitialDragState(clickedRectangles[row][col]);
        isDragging.current = true;
        handleClick(row, col); // Click the rectangle
    };
    
    const handleMouseEnter = (row, col) => {
        if (isMouseDown) {
            if (row > 1 && col > 0) {
                setClickedRectangles(prev => {
                const newRectangles = prev.map(r => [...r]); // Create a copy of the current state
                newRectangles[row][col] = newRectangles[row][col] = !initialDragState; // Ensure this rectangle is green (selected)
                return newRectangles;
        });
        }
        }
    };
    
    const handleMouseUp = () => {
        setIsMouseDown(false); // Release the mouse
        isDragging.current = false;
    };

    const handleTouchStart = (row, col) =>  {
        console.log("Touch Start: %d/%d", row, col)
        handleMouseDown(row, col); // Handle touch as mouse down
    };

    const handleTouchMove = (event) => {

        //const target = event.target;
        const touch = event.touches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target && target.classList.contains('rectangle')) {
            const row = parseInt(target.getAttribute('data-row'), 10);
            const col = parseInt(target.getAttribute('data-col'), 10);
            console.log('row: %d, col: %d', row, col)
            if (row < 33 && row > 0 && col < 8 && row > 1) {
                handleMouseEnter(row, col);
            }
        }
        /*
        const touch = event.touches[0]
        console.log('x: %d, y: %d', touch.clientX, touch.clientY)

        const calendarElement = document.querySelector('.calDiv');
        const calendarRect = calendarElement.getBoundingClientRect();
        const touchY = event.touches[0].clientY;
        let calc_y = touchY - calendarRect.top;

        

        //const touchY = touch.clientY + window.scrollY
        const rect_height = window.innerHeight * 0.025;
        const rect_width = window.innerWidth * 0.1;
        
        if (calc_y > 8*rect_height){
            calc_y -= rect_height;
        }
        if (calc_y > 15*rect_height){
            calc_y -= rect_height;
        }
        if (calc_y > 19*rect_height){
            calc_y -= rect_height;
        }
        if (calc_y > 26*rect_height){
            calc_y -= rect_height;
        }
        

        //const calc_y = touchY - (75 + (2 * rect_height)); // FIND CORRECT MULTIPLY VALUE!!!
        const calc_x = touch.clientX - ((window.innerWidth - (8 * (0.1 * window.innerWidth)))/2);
        console.log('calc x: %d,  calc y: %d', calc_x, calc_y);
        
        const calc_row = Math.floor(calc_y / rect_height);
        const calc_col = Math.floor(calc_x / rect_width)
        console.log('calc row: %d,  calc col: %d', calc_row, calc_col);
        if (calc_row < 33 && calc_row > 0 && calc_col < 8 && calc_row > 1){
            handleMouseEnter(calc_row,calc_col);
        }
        */
    };

    
    const handleTouchEnd = (event) => {
        event.preventDefault();
        handleMouseUp(); // Release the touch
    };

    const today = new Date();
    const currentDay = today.getDay();

    useEffect(() => {
        const handleDocumentMouseUp = () => {
            setIsMouseDown(false);
            isDragging.current = false;
        };
    
        document.addEventListener("mouseup", handleDocumentMouseUp);
    
        return () => {
            document.removeEventListener("mouseup", handleDocumentMouseUp);
        };
    }, []);

    const findTimeRanges = (row, col) => {
        const start_time = timeLabels[row - 2];
        let cur_row = row + 1;
        for(; cur_row < 32; cur_row ++){
            if (!clickedRectangles[cur_row][col]){
                break;
            }
        }

        const end_time = timeLabels[cur_row - 2]
        return `${start_time} - ${end_time}`;
    }



  const grid = Array.from({ length: rows * cols }, (_, index) => {
    const row = Math.floor(index / cols);  // Calculate the row index
    const col = index % cols;              // Calculate the column index
    const date = new Date(today)
    date.setDate(today.getDate() + (col))

    let backgroundColor;
    let borderTop;
    let borderLeft;
    let borderBottom;
    let borderRight;
    if (row === 0 || row === 1 || col === 0) {
        backgroundColor = "#d3d3d3"; // Grey for first row and column
        borderTop = "1px solid #767676"
        borderLeft = "1px solid #767676"
        borderBottom = "1px solid #767676"
        borderRight = "1px solid #767676"
    } else {
        backgroundColor = clickedRectangles[row][col] ? "#32d637" : "#FFFFFF"; // White for other rectangles
        borderTop = clickedRectangles[row][col] ? 'none' : "1px solid #d3d3d3";
        borderLeft = clickedRectangles[row][col] ? '1px solid #000000' : "1px solid #d3d3d3";
        borderRight = clickedRectangles[row][col] ? '1px solid #000000' : "1px solid #d3d3d3";
        if ((row > 2 && !clickedRectangles[row - 1][col] && clickedRectangles[row][col]) || (row === 2 && clickedRectangles[row][col]) || 
        (row > 2 && !clickedRectangles[row][col] && clickedRectangles[row - 1][col])){
            borderTop = '1px solid #000000';
        }
        if (col > 1 && clickedRectangles[row][col - 1]){
            borderLeft = '1px solid #000000';
        }
        if (row === 32 && clickedRectangles[row][col]){
            borderBottom = "1px solid #000000"
        }
    }
    

    const isClicked = clickedRectangles[row][col];



    return (
    <div>
    <div key={index}
    className="rectangle" 
    style={{backgroundColor, borderTop, borderLeft, borderRight, borderBottom}} 

    data-row={row}
    data-col={col}

    onMouseDown={() => handleMouseDown(row, col)}
    onMouseEnter={() => handleMouseEnter(row,col)}
    onMouseUp={handleMouseUp}
    onTouchStart={() => handleTouchStart(row, col)}
    onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd}
    > 
        {((col === 0 && row > 1) && (
            <span className="label">{timeLabels[row - 2]}</span>
        )) || ((row === 0 && col !== 0) && (
            <div>
                <span className="daylabel">{dayLabels[(col - 1 + currentDay) % 7]}</span>
            </div>
            )) || ((row === 1 & col !== 0) && (
                <div>
                    <span className="daylabel"> {date.toLocaleDateString(undefined, {month:"numeric", day: 'numeric'})} </span>
                </div>
            )) || (isClicked && ((row === 1 || !clickedRectangles[row - 1][col]) && (
                <span className="timeLabel">{findTimeRanges(row, col)}</span> 
            )))
        }
    </div>
    </div>
    );
});

    return (
    <div className="calDiv" onMouseUp={handleMouseUp}>
        <div className="grid-container">{grid}</div>
    </div>)
};

export default Calendar;