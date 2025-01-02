import React from 'react';
import './styles.css';
import Calendar from "./calendar";
import { usePlayerInfo, setPlayerInfo} from './playerContext';



function PlayerSchedule( {onBack, onSubmit} ){
    const {playerInfo, setPlayerInfo} = usePlayerInfo();
    // DO A LITTLE EXTRA WORK TO GET TIMES IN A READABLE FORMAT
    const handleSubmit = async () => {
        console.log(playerInfo)
        const rows = [
            [
                playerInfo.name,
                playerInfo.age,
                playerInfo.location,
                playerInfo.sessionType,
                playerInfo.availability.join(', '),
            ],
        ];

        try {
            const response = await fetch('http://localhost:3001/write-to-sheet', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({values: rows})

            });

            if (response.ok){
                const result = await response.json();
                console.log('Data written to Google Sheets:', result);
                //alert('Player information submitted successfully!');
            } else {
                console.error('Failed to write data:', await response.text());
                alert('Failed to submit player information.');
            }
        } catch(error){
            console.error('Error:', error);
            alert('An error occurred while submitting the player information.');
        };

        if(onSubmit){
            onSubmit(playerInfo);
        }
    }
    
    
    return (


        <div className='schedDiv'>
            <div className='buttonHolder'>
                <button className='bButton' onClick={onBack}>Back</button>
                <button className='submitButton' onClick={handleSubmit}>Submit</button>
            </div>
            <div className='pSched'>
                <h1 className='pSchedText'>Player Schedule</h1>
                <h2 className='pSchedSubText'>Click or drag over time slots to indicate your availability</h2>
            </div>
            <div className='calDiv'>
                <Calendar setPlayerInfo={setPlayerInfo}/>
            </div>
            <div className='extraSpacing'> </div>
        </div>

    );
}

export default PlayerSchedule;