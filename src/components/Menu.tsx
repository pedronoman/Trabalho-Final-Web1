import { Link } from 'react-router-dom';
import { House, Music, PlusSquare, ListMusic } from 'lucide-react';
import { usePlaylist } from '../contexts/PlaylistContext';

export function Menu() {
  const { playlists, criarPlaylist } = usePlaylist(); 

  return (
    <nav className="flex flex-col gap-4 h-full">
      <div className="space-y-4">
        {/* Textos agora são zinc-400 e ficam brancos ao passar o rato */}
        <Link to="/" className="flex items-center gap-3 text-zinc-400 hover:text-white transition font-medium">
          <House size={24} />
          Início
        </Link>
        
        <Link to="/" className="flex items-center gap-3 text-zinc-400 hover:text-white transition font-medium">
          <Music size={24} />
          Biblioteca Geral
        </Link>
      </div>

      <hr className="border-zinc-900 my-2" />

      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Suas Playlists</h3>
            <button onClick={criarPlaylist} className="text-zinc-400 hover:text-white transition" title="Criar Playlist">
                <PlusSquare size={20} />
            </button>
        </div>

        <ul className="space-y-3">
            {playlists.map(playlist => (
                <li key={playlist.id}>
                    <Link 
                        to={`/playlist/${playlist.id}`} 
                        className="flex items-center gap-3 text-zinc-400 hover:text-white transition truncate"
                    >
                        <ListMusic size={18} />
                        {playlist.name}
                    </Link>
                </li>
            ))}
        </ul>
      </div>
    </nav>
  );
}