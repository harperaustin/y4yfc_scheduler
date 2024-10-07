import React, { useState } from 'react';

function NameScreenPlayer({ onBack, onContinue }) {
    const [name, setName] = useState('');

    const handleInputChange = (e) => {
        setName(e.target.value);
    };

    const handleCont = () => {
        onContinue(name);
    }
    return (
    <div>
        <h1>Player Name</h1>
        <button onClick={onBack}>Go Back to Screen 1</button>
        
        <input
            type="text"
            value={name}
            onChange={handleInputChange}
            placeholder="Player Name"
        />
        <button onClick={handleCont}>Continue</button>
    </div>

    );
}

export default NameScreenPlayer;
