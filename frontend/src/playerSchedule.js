import React from 'react';
import './styles.css';
import Calendar from "./calendar";
import { usePlayerInfo, setPlayerInfo} from './playerContext';



function PlayerSchedule( {onBack, onSubmit} ){
    const {playerInfo, setPlayerInfo} = usePlayerInfo();

    const convertAvailabilitytoString = (availabilityMap) => {
        // helper function to parse the date
        const parseDate = (formattedDate) =>  {
            const [day, date] = formattedDate.split(" ");
            const [month, dayOfMonth] = date.split("/").map(Number);
            const year = new Date().getFullYear();
            return new Date(year, month - 1, dayOfMonth);
        }

        const sortedDates = Object.keys(availabilityMap).sort((a,b) => {
            return parseDate(a) - parseDate(b);
        });

        const availabilityString = sortedDates.map((date)=> `${date}: ${availabilityMap[date].join(", ")}`).join("\n");

        return availabilityString;
        
    }

    const formatSubmissionDate = (date) =>{
        const timeFormatter = new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true
        });
    
        const dateFormatter = new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        });
    
        const time = timeFormatter.format(date);
        const formattedDate = dateFormatter.format(date);
    
        return `${time}, ${formattedDate}`;
    };

    const handleSubmit = async () => {
        console.log(playerInfo)


        const rows = [
            [
                playerInfo.name,
                playerInfo.age,
                playerInfo.location,
                playerInfo.sessionType,
                formatSubmissionDate(new Date()),
                convertAvailabilitytoString(playerInfo.availability),
            ],
        ];

        try {
            const response = await fetch('http://192.168.1.111:3001/write-to-sheet', {
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