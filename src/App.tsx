import { Outlet } from 'react-router-dom';
import { Menu } from './components/Menu';
import { Player } from './components/Player';
import { PlayerProvider } from './contexts/PlayerContext';
import { PlaylistProvider } from './contexts/PlaylistContext';

function App() {
  return (
    <PlayerProvider>
      <PlaylistProvider>
        
        {/* Fundo preto no ecrã inteiro (mata a barra branca) */}
        <div className="flex h-screen bg-black text-zinc-300">
          
          {/* Menu Lateral agora é preto puro, estilo Spotify */}
          <aside className="w-64 bg-black h-screen overflow-y-auto hidden md:block border-r border-zinc-900">
            <div className="p-6">
              <Menu />
            </div>
          </aside>

          {/* Área Principal em cinzento super escuro */}
          <main className="flex-1 overflow-auto bg-zinc-950">
            <Outlet />
          </main>
        </div>

        <Player />
      
      </PlaylistProvider>
    </PlayerProvider>
  );
}

export default App;