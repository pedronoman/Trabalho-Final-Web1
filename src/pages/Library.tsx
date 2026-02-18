import React, { useEffect, useState } from 'react';
import api, { Musica } from '../services/api'; 

export function Library() {
    // 1. Estados
    const [musicas, setMusicas] = useState<Musica[]>([]);
    const [novaMusica, setNovaMusica] = useState({ title: '', artist: '', url: '', playlist_id: 1 });

    // 2. DEFINIR A FUNÇÃO PRIMEIRO (Para resolver o erro do ESLint)
    async function carregarMusicas() {
        try {
            const resposta = await api.get('/api/songs');
            setMusicas(resposta.data);
            console.log("Músicas carregadas:", resposta.data);
        } catch (erro) {
            console.error("Erro ao buscar músicas:", erro);
            // alert("Erro ao conectar com o servidor."); // Comentei para não incomodar no inicio
        }
    }

    // 3. EFEITO QUE CHAMA A FUNÇÃO (Agora ela já existe!)
    useEffect(() => {
        (async () => {
            await carregarMusicas();
        })();
    }, []);

    // 4. Função de Salvar
    async function adicionarMusica(e: React.FormEvent) {
        e.preventDefault(); 
        try {
            try { await api.post('/api/playlists', { name: "Geral" }); } catch {}

            await api.post('/api/songs', novaMusica);
            
            alert("Música salva!");
            setNovaMusica({ title: '', artist: '', url: '', playlist_id: 1 }); 
            carregarMusicas(); 
        } catch (erro) {
            console.error(erro);
            alert("Erro ao salvar.");
        }
    }

    // 5. O HTML (JSX)
    return (
        <div className="p-10 container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Minha Biblioteca Musical 🎵</h1>

            {/* FORMULÁRIO */}
            <form onSubmit={adicionarMusica} className="mb-8 p-4 bg-gray-100 rounded-lg flex flex-wrap gap-2">
                <input 
                    placeholder="Nome da Música" 
                    className="p-2 border rounded"
                    value={novaMusica.title}
                    onChange={e => setNovaMusica({...novaMusica, title: e.target.value})}
                    required
                />
                <input 
                    placeholder="Artista" 
                    className="p-2 border rounded"
                    value={novaMusica.artist}
                    onChange={e => setNovaMusica({...novaMusica, artist: e.target.value})}
                />
                <input 
                    placeholder="URL do MP3" 
                    className="p-2 border rounded flex-grow"
                    value={novaMusica.url}
                    onChange={e => setNovaMusica({...novaMusica, url: e.target.value})}
                    required
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Adicionar +
                </button>
            </form>

            {/* LISTA */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {musicas.map(musica => (
                    <div key={musica.id} className="border p-4 rounded shadow hover:shadow-lg transition">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">{musica.title}</h3>
                                <p className="text-gray-600">{musica.artist}</p>
                            </div>
                        </div>
                        <audio controls src={musica.url} className="w-full mt-3 h-8" />
                    </div>
                ))}
            </div>

            {musicas.length === 0 && (
                <p className="text-gray-500 text-center mt-10">
                    Ainda sem músicas... Tenta adicionar uma!
                    <br/>
                    <small>(Certifica-te que o Backend está rodando no outro terminal)</small>
                </p>
            )}
        </div>
    );
}