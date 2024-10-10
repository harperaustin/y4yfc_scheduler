import React from 'react';
import logo from './assets/LOGO INVERT.png';
import "./startingStyles.css"; 


function StartingScreen({ onPlayer, onCoach }) {
    return (
        <div className="starting-screen">
            <img src={logo} alt="Logo" className="logo" />
            <h1 className="title">Scheduling</h1>
            <div className="button-container">
                <button className="action-button" onClick={onPlayer}>Player/Parent</button>
                <button className="action-button" onClick={onCoach}>Coach</button>
            </div>
        </div>
    );
}

export default StartingScreen;
