import React from 'react';
import './styles.css';
import Calendar from "./calendar";
import { usePlayerInfo } from './playerContext';



function PlayerSchedule( {onBack, onSubmit} ){
    const {playerInfo} = usePlayerInfo();
    console.log(playerInfo)
    
    
    return (


        <div className='schedDiv'>
            <div className='buttonHolder'>
                <button className='bButton' onClick={onBack}>Back</button>
                <button className='submitButton' onClick={onSubmit}>Submit</button>
            </div>
            <div className='pSched'>
                <h1 className='pSchedText'>Player Schedule</h1>
                <h2 className='pSchedSubText'>Click or drag over time slots to indicate your availability</h2>
            </div>
            <div className='calDiv'>
                <Calendar />
            </div>
            <div className='extraSpacing'> </div>
        </div>

    );
}

export default PlayerSchedule;