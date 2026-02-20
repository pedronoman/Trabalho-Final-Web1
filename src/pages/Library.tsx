import React, { useEffect, useState } from 'react';
import { api, type Musica } from '../services/api'; 
import { usePlayer } from '../contexts/PlayerContext'; 
import { usePlaylist } from '../contexts/PlaylistContext'; 
// 1. Adicionamos o ícone Search (Lupa)
import { Play, Loader2, Heart, Search } from 'lucide-react'; 

export function Library() {
    const [musicas, setMusicas] = useState<Musica[]>([]);
    const { playlists } = usePlaylist(); 
    const [novaMusica, setNovaMusica] = useState({ title: '', artist: '', url: '', playlist_id: 0 });
    const [isCarregando, setIsCarregando] = useState(false);
    
    // 2. Novo estado para a barra de pesquisa
    const [busca, setBusca] = useState('');

    const { playSong } = usePlayer(); 

    useEffect(() => { carregarMusicas(); }, []);

    useEffect(() => {
        if (playlists.length > 0 && novaMusica.playlist_id === 0) {
            setNovaMusica(prev => ({ ...prev, playlist_id: playlists[0].id }));
        }
    }, [playlists]);

    async function carregarMusicas() {
        try {
            const resposta = await api.get('/api/songs');
            setMusicas(resposta.data);
        } catch (erro) {
            console.error("Erro ao buscar músicas:", erro);
        }
    }

    async function adicionarMusica(e: React.FormEvent) {
        e.preventDefault(); 
        setIsCarregando(true); 

        try { new URL(novaMusica.url); } catch {
            alert("❌ Por favor, insira um link válido (começando com http:// ou https://)");
            setIsCarregando(false);
            return; 
        }

        const isAudioValido = await new Promise((resolve) => {
            const audioTeste = new Audio(novaMusica.url);
            audioTeste.onloadedmetadata = () => resolve(true);
            audioTeste.onerror = () => resolve(false);
        });

        if (!isAudioValido) {
            alert("❌ O link não é um arquivo de áudio suportado ou está quebrado.");
            setIsCarregando(false);
            return; 
        }

        try {
            const dadosParaSalvar = { ...novaMusica, playlist_id: Number(novaMusica.playlist_id) };
            await api.post('/api/songs', dadosParaSalvar);
            setNovaMusica({ title: '', artist: '', url: '', playlist_id: novaMusica.playlist_id }); 
            carregarMusicas(); 
        } catch (erro) {
            console.error(erro);
            alert("Erro ao salvar no banco de dados.");
        } finally {
            setIsCarregando(false); 
        }
    }

    async function favoritarMusica(id: number, e: React.MouseEvent) {
        e.stopPropagation(); 
        try {
            const resposta = await api.patch(`/api/songs/${id}/favorite`);
            setMusicas(musicas.map(musica => 
                musica.id === id ? { ...musica, isFavorite: resposta.data.isFavorite } : musica
            ));
        } catch (erro) {
            console.error("Erro ao favoritar", erro);
        }
    }

    // 3. Lógica de Filtragem (Procura no título OU no artista)
    const musicasFiltradas = musicas.filter(musica => 
        musica.title.toLowerCase().includes(busca.toLowerCase()) || 
        (musica.artist && musica.artist.toLowerCase().includes(busca.toLowerCase()))
    );

    return (
        <div className="p-10 container mx-auto mb-24 text-white"> 
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                Minha Biblioteca Musical 🎵
            </h1>

            {/* FORMULÁRIO DE ADICIONAR */}
            <form onSubmit={adicionarMusica} className="mb-8 p-6 bg-zinc-900/50 border border-zinc-800/50 rounded-xl flex flex-wrap gap-3 shadow-sm">
                <input 
                    placeholder="Nome da Música" 
                    className="p-3 bg-zinc-800/80 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 flex-1 min-w-[200px] placeholder-zinc-500"
                    value={novaMusica.title}
                    onChange={e => setNovaMusica({...novaMusica, title: e.target.value})}
                    required
                />
                <input 
                    placeholder="Artista" 
                    className="p-3 bg-zinc-800/80 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 flex-1 min-w-[150px] placeholder-zinc-500"
                    value={novaMusica.artist}
                    onChange={e => setNovaMusica({...novaMusica, artist: e.target.value})}
                />
                <input 
                    placeholder="URL do MP3" 
                    className="p-3 bg-zinc-800/80 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 flex-2 min-w-[250px] placeholder-zinc-500"
                    value={novaMusica.url}
                    onChange={e => setNovaMusica({...novaMusica, url: e.target.value})}
                    required
                />
                
                <select 
                    className="p-3 bg-zinc-800/80 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                    value={novaMusica.playlist_id}
                    onChange={e => setNovaMusica({...novaMusica, playlist_id: Number(e.target.value)})}
                    required
                >
                    <option value={0} disabled>Selecione a Playlist...</option>
                    {playlists.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>

                <button 
                    type="submit" 
                    disabled={isCarregando}
                    className="bg-green-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-green-400 transition shadow-md hover:scale-105 whitespace-nowrap disabled:bg-green-800 disabled:text-zinc-500 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isCarregando ? (
                        <><Loader2 size={20} className="animate-spin" /> Verificando...</>
                    ) : (
                        "Adicionar +"
                    )}
                </button>
            </form>

            {/* BARRA DE PESQUISA (NOVIDADE) */}
            <div className="mb-8 relative">
                <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                <input 
                    type="text"
                    placeholder="O que queres ouvir? Procura por músicas ou artistas..."
                    className="w-full p-4 pl-12 bg-zinc-900 border border-zinc-800 rounded-full text-white focus:outline-none focus:border-zinc-600 focus:bg-zinc-800 transition-colors placeholder-zinc-500"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
            </div>

            {/* LISTA DE MÚSICAS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Agora mapeamos 'musicasFiltradas' em vez de 'musicas' */}
                {musicasFiltradas.map(musica => (
                    <div key={musica.id} className="group bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-800 p-4 rounded-xl shadow-sm transition-colors flex items-center gap-4 cursor-pointer">
                        <div className="w-16 h-16 bg-zinc-800 rounded-md flex items-center justify-center text-zinc-500 font-bold text-xl shadow-inner">
                            {musica.cover ? <img src={musica.cover} className="w-full h-full object-cover rounded-md"/> : '♪'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-white truncate">{musica.title}</h3>
                            <p className="text-sm text-zinc-400 truncate mt-1">{musica.artist}</p>
                        </div>

                        <button 
                            onClick={(e) => favoritarMusica(musica.id, e)}
                            className="mr-2 transition-transform hover:scale-110 focus:outline-none"
                            title={musica.isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
                        >
                            <Heart 
                                size={22} 
                                className={musica.isFavorite ? "fill-green-500 text-green-500" : "text-zinc-500 hover:text-white"} 
                            />
                        </button>

                        <button 
                            // O Player precisa receber a lista filtrada para o auto-play tocar as músicas certas na ordem!
                            onClick={() => playSong(musica, musicasFiltradas)} 
                            className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black shadow-lg hover:bg-green-400 hover:scale-105 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                            title="Tocar agora"
                        >
                            <Play size={24} fill="black" className="ml-1"/>
                        </button>
                    </div>
                ))}
            </div>

            {/* MENSAGEM SE A PESQUISA NÃO ENCONTRAR NADA */}
            {musicas.length > 0 && musicasFiltradas.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-zinc-500 text-lg">Nenhuma música encontrada para "{busca}".</p>
                </div>
            )}

            {/* MENSAGEM SE A BIBLIOTECA ESTIVER VAZIA */}
            {musicas.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-zinc-500 text-lg">A tua biblioteca está vazia.</p>
                </div>
            )}
        </div>
    );
}