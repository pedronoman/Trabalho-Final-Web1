import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api, type Playlist } from '../services/api';
import { usePlayer } from '../contexts/PlayerContext';
import { usePlaylist } from '../contexts/PlaylistContext';
import { Play, Clock, Trash2, Edit3, Music } from 'lucide-react';

export function PlaylistDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    
    const { playSong } = usePlayer();
    const { renomearPlaylist, deletarPlaylist } = usePlaylist(); 

    useEffect(() => {
        carregarPlaylist();
    }, [id]);

    async function carregarPlaylist() {
        try {
            const resposta = await api.get(`/api/playlists/${id}`);
            setPlaylist(resposta.data);
        } catch (error) {
            console.error("Erro ao carregar playlist", error);
        }
    }

    async function handleRename() {
        if (!playlist) return;
        const novoNome = prompt("Novo nome da playlist:", playlist.name);
        
        if (novoNome && novoNome !== playlist.name) {
            try {
                await renomearPlaylist(playlist.id, novoNome);
                setPlaylist({ ...playlist, name: novoNome }); 
            } catch (error) {
                alert("Erro ao renomear.");
            }
        }
    }

    async function handleDelete() {
        if (!playlist) return;
        const confirmacao = confirm(`Tem certeza que deseja excluir a playlist "${playlist.name}"?`);
        
        if (confirmacao) {
            try {
                await deletarPlaylist(playlist.id);
                navigate('/'); 
            } catch (error) {
                alert("Erro ao excluir playlist.");
            }
        }
    }

    if (!playlist) return <div className="p-10 text-zinc-900 font-medium">Carregando...</div>;

    return (
        // 1. MUDANÇA AQUI: Fundo principal agora é um cinza quase preto (bg-zinc-950) e min-h-full para preencher a tela
        <div className="flex flex-col min-h-full bg-zinc-950 pb-24">
            
            {/* 2. MUDANÇA AQUI: O gradiente agora vai do verde para o bg-zinc-950 para não ter cortes secos */}
            <div className="h-72 bg-gradient-to-b from-green-800 to-zinc-950 p-8 flex items-end gap-6 text-white">
                <div className="w-48 h-48 bg-zinc-800 shadow-2xl flex items-center justify-center text-zinc-500 rounded-md">
                    <Music size={64} />
                </div>
                
                <div className="flex-1">
                    <span className="uppercase text-xs font-bold mt-4 tracking-wider">Playlist</span>
                    
                    <div className="flex items-center gap-4 group">
                        <h1 className="text-6xl font-bold mt-2 mb-4 truncate">{playlist.name}</h1>
                        
                        <div className="opacity-0 group-hover:opacity-100 transition flex gap-2">
                            <button onClick={handleRename} className="p-2 bg-black/20 rounded-full hover:bg-white/20 transition" title="Renomear">
                                <Edit3 size={20} />
                            </button>
                            <button onClick={handleDelete} className="p-2 bg-black/20 rounded-full hover:bg-red-500/80 transition" title="Excluir">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>

                    <p className="text-zinc-300 font-medium text-sm">
                        {playlist.songs?.length || 0} músicas
                    </p>
                </div>
            </div>

            {/* 3. MUDANÇA AQUI: Removido o fundo transparente. Agora ele herda o escuro do pai. */}
            <div className="p-8 flex-1">
                {(!playlist.songs || playlist.songs.length === 0) ? (
                    <div className="text-center py-20">
                        <p className="text-zinc-400 mb-4 text-lg">Esta playlist está vazia.</p>
                        <p className="text-sm text-zinc-500">Vá para a Biblioteca Geral para adicionar músicas!</p>
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            {/* 4. MUDANÇA AQUI: Borda inferior mais sutil (border-zinc-800) */}
                            <tr className="text-zinc-400 border-b border-zinc-800 text-sm uppercase tracking-wider">
                                <th className="pb-3 w-12 text-center font-medium">#</th>
                                <th className="pb-3 font-medium">Título</th>
                                <th className="pb-3 font-medium">Álbum</th>
                                <th className="pb-3 text-right font-medium"><Clock size={16} className="inline-block"/></th>
                            </tr>
                        </thead>
                        <tbody>
                            {playlist.songs.map((song, index) => (
                                <tr 
                                    key={song.id} 
                                    // 5. MUDANÇA AQUI: Hover mais elegante e sutil (bg-white/5)
                                    className="group hover:bg-white/5 transition rounded-md cursor-pointer text-zinc-300 hover:text-white"
                                    onClick={() => playSong(song, playlist.songs || [])}
                                >
                                    <td className="py-3 px-2 rounded-l-md text-center w-12">
                                        <span className="group-hover:hidden">{index + 1}</span>
                                        <Play size={16} className="hidden group-hover:block mx-auto text-green-500 fill-current"/>
                                    </td>
                                    <td className="py-3">
                                        <div className="font-semibold text-white truncate">{song.title}</div>
                                        <div className="text-xs text-zinc-400 truncate mt-1">{song.artist}</div>
                                    </td>
                                    <td className="py-3 text-sm text-zinc-400">{song.album || "-"}</td>
                                    <td className="py-3 text-right rounded-r-md pr-4 text-sm font-mono text-zinc-400">
                                        --:--
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}