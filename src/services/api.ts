import axios from 'axios';

// 1. Exportação Nomeada da API (Adicionamos o 'export' aqui)
export const api = axios.create({
    baseURL: 'http://localhost:5000', 
});

// 2. Interfaces
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