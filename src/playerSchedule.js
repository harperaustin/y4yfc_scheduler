import React, { useState } from 'react';
import './styles.css';
import Calendar from "./calendar"



function PlayerSchedule( {onBack} ){


    
    
    return (
        <div>
            <h1>
                <button onClick={onBack}>GoBack</button>
                Player Schedule  
            </h1>

            <Calendar />
        </div>
    );
}

export default PlayerSchedule;