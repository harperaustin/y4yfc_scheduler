import React, { useState } from 'react';
import './nameScreenStyle.css';

function NameScreenPlayer({ onBack, onContinue }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState(''); // New state for age input
    const [error, setError] = useState('');
    const [selectedLoc, setSelectedLoc] = useState(null);
    const [selectedSesh, setSelectedSesh] = useState(null);

    const handleLocClick = (loc) => {
        setSelectedLoc(loc); // Update state when a button is clicked
    };

    const handleSeshClick = (sesh) => {
        setSelectedSesh(sesh); // Update state when a button is clicked
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleAgeChange = (e) => {
        setAge(e.target.value);
    };

    const handleCont = () => {
        if (name === '') {
            setError('Please enter name'); // Show error if fields are empty
        } else {
            setError(''); // Clear error if validation passes
            onContinue(name, age); // Pass both name and age
        }
    };
    return (
        <div className='nameScreenCenterer'>
        <div className="nameScreenContainer">
            <button onClick={onBack} className="backButton">Back</button>
            <button className="continue-button" onClick={handleCont}>Continue</button>
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
            <h1>Player Information</h1>
            <h2>Name</h2>
            <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Player Name(s) (required)"

            />
            <h2>Age</h2>
            <input
                type="number"
                value={age}
                onChange={handleAgeChange}
                placeholder="Player Age"
                min="0"
                max="50"
            />
            <h2>Preferred Location</h2>
            <div className='location-selection'>
                <button className={`loc-button ${selectedLoc === 'Manhattan' ? 'selected' : ''}`}
                    onClick={() => handleLocClick('Manhattan')} >
                    Manhattan
                </button>
                <button className={`loc-button ${selectedLoc === 'Brooklyn' ? 'selected' : ''}`}
                    onClick={() => handleLocClick('Brooklyn')} >
                    Brooklyn
                </button>
                <button className={`loc-button ${selectedLoc === 'Queens' ? 'selected' : ''}`}
                    onClick={() => handleLocClick('Queens')} >
                    Queens  
                </button>
                <button className={`loc-button ${selectedLoc === 'Bronx' ? 'selected' : ''}`}
                    onClick={() => handleLocClick('Bronx')} >
                    Bronx
                </button>
                <button className={`loc-button ${selectedLoc === 'Other' ? 'selected' : ''}`}
                    onClick={() => handleLocClick('Other')} >
                    Other
                </button>
            </div>
            <h2>Session Type</h2>
            <div className='location-selection'>
            <button className={`loc-button ${selectedSesh === 'Group' ? 'selected' : ''}`}
                    onClick={() => handleSeshClick('Group')} >
                    Group
                </button>
            <button className={`loc-button ${selectedSesh === 'Private' ? 'selected' : ''}`}
                    onClick={() => handleSeshClick('Private')} >
                    Private
                </button>
            </div>

            
            
        </div>
        
        </div>
    );
}

export default NameScreenPlayer;
