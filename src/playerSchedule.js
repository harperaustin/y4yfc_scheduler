import React from 'react';
import './styles.css';
import Calendar from "./calendar"



function PlayerSchedule( {onBack} ){


    
    
    return (
        <div className='schedDiv'>
            <div className='buttonHolder'>
                <button className='bButton' onClick={onBack}>Back</button>
                <button className='submitButton'>Submit</button>
            </div>
            <div className='pSched'>
                
                <h1 className='pSchedText'>Player Schedule</h1>
                <h2 className='pSchedSubText'>Click or drag over time slots to indicate your availability</h2>
            </div>
            <div className='calDiv'>
                <Calendar />
            </div>
        </div>
    );
}

export default PlayerSchedule;