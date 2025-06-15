import React, { createContext, useContext, useRef, useEffect } from 'react';

interface SoundContextType {
  playSound: () => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/sound.mp3');
    
    // Preload the audio file
    if (audioRef.current) {
      audioRef.current.preload = 'auto';
      
      // Allow for interaction with audio before playing
      const prepareAudio = () => {
        if (audioRef.current) {
          // Load the audio file
          audioRef.current.load();
          
          // Remove the event listeners once audio is prepared
          document.removeEventListener('click', prepareAudio);
          document.removeEventListener('touchstart', prepareAudio);
        }
      };
      
      // Listen for user interaction to prepare audio
      document.addEventListener('click', prepareAudio, { once: true });
      document.addEventListener('touchstart', prepareAudio, { once: true });
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playSound = () => {
    if (audioRef.current) {
      try {
        // Reset audio position and set volume
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0.7;
        
        // Play the audio with error handling
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Audio playing successfully");
            })
            .catch(error => {
              console.error("Audio play failed:", error);
              
              // If audio fails because of user interaction requirements, try again on next click
              if (error.name === "NotAllowedError") {
                const unlockAudio = () => {
                  if (audioRef.current) {
                    audioRef.current.play();
                    document.removeEventListener('click', unlockAudio);
                  }
                };
                document.addEventListener('click', unlockAudio, { once: true });
              }
            });
        }
      } catch (e) {
        console.error("Error attempting to play audio:", e);
      }
    }
  };

  return (
    <SoundContext.Provider value={{ playSound }}>
      {children}
      {/* Hidden audio element to help with mobile browsers */}
      <audio 
        src="/sound.mp3" 
        preload="auto" 
        style={{ display: 'none' }} 
      />
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
