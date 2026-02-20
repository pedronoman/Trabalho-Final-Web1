import { useEffect, useRef, useState } from 'react';
import { usePlayer } from '../contexts/PlayerContext';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

// Função auxiliar para formatar tempo (ex: 125s -> 02:05)
function formatTime(seconds: number) {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function Player() {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious } = usePlayer();
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [volume, setVolume] = useState(0.5); 
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong, volume]);

  // Atualiza o tempo enquanto a música toca
  function handleTimeUpdate() {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }

  // Carrega a duração total quando a música inicia
  function handleLoadedMetadata() {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }

  // Permite ao usuário arrastar a barra de progresso
  function handleProgressChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  }

  if (!currentSong) {
    return null; // Esconde o player se não houver música
  }

  // Cálculos para os gradientes das barras
  const volumePercentage = volume * 100;
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 text-white flex flex-col z-50">
      
      {/* ELEMENTO DE ÁUDIO INVISÍVEL */}
      <audio 
        ref={audioRef} 
        src={currentSong.url} 
        onEnded={playNext}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      <div className="flex items-center justify-between px-4 h-20">
        
        {/* ESQUERDA: Info da Música */}
        <div className="flex items-center gap-3 w-1/3">
            <div className="w-14 h-14 bg-zinc-800 rounded overflow-hidden flex items-center justify-center relative group">
                {currentSong.cover ? (
                    <img src={currentSong.cover} alt="Capa" className="w-full h-full object-cover" />
                ) : (
                    <span className="text-xs text-zinc-500">♪</span>
                )}
            </div>
            <div className="flex flex-col overflow-hidden">
                <span className="font-semibold truncate">{currentSong.title}</span>
                <span className="text-xs text-zinc-400 truncate">{currentSong.artist}</span>
            </div>
        </div>

        {/* CENTRO: Controles e Progresso */}
        <div className="flex flex-col items-center max-w-[40%] w-full gap-2">
            {/* Botões */}
            <div className="flex items-center gap-6">
                <button onClick={playPrevious} className="text-zinc-400 hover:text-white transition"><SkipBack size={20} /></button>
                <button 
                    onClick={togglePlay} 
                    className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition"
                >
                    {isPlaying ? <Pause size={16} fill='black' /> : <Play size={16} fill='black' className="ml-1" />}
                </button>
                <button onClick={playNext} className="text-zinc-400 hover:text-white transition"><SkipForward size={20} /></button>
            </div>

            {/* Barra de Progresso + Tempo */}
            <div className="w-full flex items-center gap-2 text-xs text-zinc-400 font-mono">
                <span>{formatTime(currentTime)}</span>
                
                <input 
                    type="range" 
                    min="0" 
                    max={duration} 
                    value={currentTime}
                    onChange={handleProgressChange}
                    className="flex-1 h-1 rounded-lg appearance-none cursor-pointer accent-white"
                    style={{
                        background: `linear-gradient(to right, white ${progressPercentage}%, rgb(82 82 91 / 0.5) ${progressPercentage}%)`
                    }}
                />
                
                <span>{formatTime(duration)}</span>
            </div>
        </div>

        {/* DIREITA: Volume */}
        <div className="flex items-center gap-2 w-1/3 justify-end group">
            <Volume2 size={18} className="text-zinc-400 group-hover:text-white transition"/>
            <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 h-1 rounded-lg appearance-none cursor-pointer accent-white"
                style={{
                    background: `linear-gradient(to right, white ${volumePercentage}%, rgb(82 82 91 / 0.5) ${volumePercentage}%)`
                }}
            />
        </div>
      </div>
    </div>
  );
}