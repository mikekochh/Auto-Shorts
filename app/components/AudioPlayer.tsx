import React, { useRef, useState, useEffect } from 'react';

interface AudioPlayerProps {
  voicesArray: string[];
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ voicesArray }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.src = `/audio/${voicesArray[currentIndex]}`;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(error => {
          console.error('Error playing audio:', error);
        });
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const playNextAudio = () => {
    if (currentIndex < voicesArray.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
      setIsPlaying(false); // Reset playing state when the list ends
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener('ended', playNextAudio);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('ended', playNextAudio);
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current && currentIndex < voicesArray.length) {
      audioRef.current.src = `/audio/${voicesArray[currentIndex]}`;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentIndex]);

  return (
    <div>
      <audio ref={audioRef} />
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mb-4"
        onClick={togglePlayPause}>
            {isPlaying ? 'Pause' : 'Play'}
        </button>
    </div>
  );
};

export default AudioPlayer;
