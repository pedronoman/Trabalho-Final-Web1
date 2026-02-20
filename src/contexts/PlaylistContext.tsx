import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { api, type Playlist } from '../services/api';

interface PlaylistContextData {
  playlists: Playlist[];
  criarPlaylist: () => Promise<void>;
  renomearPlaylist: (id: number, novoNome: string) => Promise<void>;
  deletarPlaylist: (id: number) => Promise<void>;
}

export const PlaylistContext = createContext({} as PlaylistContextData);

export function PlaylistProvider({ children }: { children: ReactNode }) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  // Carregar listas ao iniciar
  useEffect(() => {
    carregarPlaylists();
  }, []);

  async function carregarPlaylists() {
    try {
      const resposta = await api.get('/api/playlists');
      setPlaylists(resposta.data);
    } catch (error) {
      console.error("Erro ao carregar playlists", error);
    }
  }

  async function criarPlaylist() {
    const nome = prompt("Nome da nova playlist:");
    if (!nome) return;

    try {
      const resposta = await api.post('/api/playlists', { name: nome });
      // Atualiza a lista local adicionando a nova (sem precisar de F5)
      setPlaylists([...playlists, resposta.data]);
    } catch (error) {
      alert("Erro ao criar playlist.");
    }
  }

  async function renomearPlaylist(id: number, novoNome: string) {
    try {
      await api.put(`/api/playlists/${id}`, { name: novoNome });
      // Atualiza só aquela playlist específica na memória
      setPlaylists(playlists.map(p => p.id === id ? { ...p, name: novoNome } : p));
    } catch (error) {
      console.error(error);
      throw error; // Lança o erro para a página tratar se quiser
    }
  }

  async function deletarPlaylist(id: number) {
    try {
      await api.delete(`/api/playlists/${id}`);
      // Remove da lista local
      setPlaylists(playlists.filter(p => p.id !== id));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return (
    <PlaylistContext.Provider value={{ playlists, criarPlaylist, renomearPlaylist, deletarPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
}

export const usePlaylist = () => useContext(PlaylistContext);