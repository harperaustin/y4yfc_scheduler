import React from 'react';

function StartingScreen( {onPlayer, onCoach} ){
    return (
        <div>
            <h1>
                LOGO
            </h1>
            <button onClick={onPlayer}>Player/Parent</button>
            <button onClick={onCoach}>Coach</button>
        </div>
    );
}

export default StartingScreen;