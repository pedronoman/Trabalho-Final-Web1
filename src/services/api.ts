import axios from 'axios';

// Cria a instância
const api = axios.create({
    baseURL: 'http://localhost:5000', 
});

// INTERFACES (Tipos)
export interface Musica {
    id: number;
    title: string;
    artist: string;
    url: string; 
    cover?: string;
    album?: string;
    playlist_id: number;
}

export interface Playlist {
    id: number;
    name: string;
    description?: string;
    songs?: Musica[];
}

// CORREÇÃO: Usar "export default" para o axios funcionar nas páginas
export default api;