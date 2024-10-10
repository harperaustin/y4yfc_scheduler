import React, { useState } from 'react';
import './nameScreenStyle.css';

function NameScreenPlayer({ onBack, onContinue }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState(''); // New state for age input
    const [error, setError] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleAgeChange = (e) => {
        const value = e.target.value;
        if (value === '' || (Number(value) >= 0 && Number(value) <= 50)) {
            setAge(value);
            setError(''); // Clear any previous errors
        } else {
            setAge(value);
            setError('Age must be between 0 and 50');
        }
    };

    const handleCont = () => {
        if (name === '' || age === '' || error !== '') {
            setError('Please fill in both fields correctly'); // Show error if fields are empty
        } else {
            setError(''); // Clear error if validation passes
            onContinue(name, age); // Pass both name and age
        }
    };
    return (
        <div className="nameScreenContainer">
            <button onClick={onBack} className="backButton">Back</button>
            <h1>Player Information</h1>
            <h2>Name</h2>
            <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Player Name (required)"

            />
            <h2>Age</h2>
            <input
                type="number"
                value={age}
                onChange={handleAgeChange}
                placeholder="Player Age (required)"
                min="0"
                max="50"
            />

            {error && <p className="error-message">{error}</p>} {/* Display error message */}
            <button onClick={handleCont}>Continue</button>
        </div>
    );
}

export default NameScreenPlayer;
