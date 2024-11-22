
import React, { createContext, useContext, useState } from 'react';

// Create a context
const PlayerContext = createContext();

// Create a provider component
export function PlayerProvider({ children }) {
    const [playerInfo, setPlayerInfo] = useState({
        name: '',
        age: '',
        location: '',
        sessionType: '',
        availability : []
    });

    return (
        <PlayerContext.Provider value={{ playerInfo, setPlayerInfo }}>
            {children}
        </PlayerContext.Provider>
    );
}

// Custom hook for easier access
export function usePlayerInfo() {
    return useContext(PlayerContext);
}
