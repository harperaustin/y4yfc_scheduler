import React from 'react';

function CoachSchedule( {onBack} ){
    return (
        <div>
            <h1>
                Coach Schedule
            </h1>
            <button onClick={onBack}>GoBack</button>
        </div>
    );
}

export default CoachSchedule;