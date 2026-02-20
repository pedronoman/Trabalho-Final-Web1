import { createContext, useState, ReactNode, useContext } from 'react';
import { type Musica } from '../services/api';

interface PlayerContextData {
  currentSong: Musica | null;
  isPlaying: boolean;
  songList: Musica[]; // Nova: Guarda a lista atual
  playSong: (song: Musica, list: Musica[]) => void; // Atualizada: Recebe a lista também
  togglePlay: () => void;
  playNext: () => void; // Nova
  playPrevious: () => void; // Nova
}

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Musica | null>(null);
  const [songList, setSongList] = useState<Musica[]>([]); // Estado da lista
  const [isPlaying, setIsPlaying] = useState(false);

  function playSong(song: Musica, list: Musica[]) {
    setCurrentSong(song);
    setSongList(list); // Guarda a lista para saber qual é a próxima
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function playNext() {
    if (!currentSong || songList.length === 0) return;

    const currentIndex = songList.findIndex(song => song.id === currentSong.id);
    const nextIndex = currentIndex + 1;

    // Se tiver próxima, toca. Se não, volta para a primeira (loop) ou para.
    if (nextIndex < songList.length) {
      setCurrentSong(songList[nextIndex]);
      setIsPlaying(true);
    }
  }

  function playPrevious() {
    if (!currentSong || songList.length === 0) return;

    const currentIndex = songList.findIndex(song => song.id === currentSong.id);
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      setCurrentSong(songList[prevIndex]);
      setIsPlaying(true);
    }
  }

  return (
    <PlayerContext.Provider value={{ 
        currentSong, 
        songList, 
        isPlaying, 
        playSong, 
        togglePlay, 
        playNext, 
        playPrevious 
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);