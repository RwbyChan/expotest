import React, { createContext, useContext, useState } from 'react';

const PlayerStateContext = createContext();

export const PlayerStateProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  // Function to start playing the video
  const play = () => {
    setIsPlaying(true);
  };

  // Function to pause the video
  const pause = () => {
    setIsPlaying(false);
  };

  return (
    <PlayerStateContext.Provider value={{ isPlaying, play, pause }}>
      {children}
    </PlayerStateContext.Provider>
  );
};

export const usePlayerState = () => {
  return useContext(PlayerStateContext);
};
