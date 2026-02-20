import { Router } from 'express';
import { PlaylistController } from '../controllers/PlaylistController.js';

const playlistRouter = Router();
const playlistController = new PlaylistController();

// Rotas existentes
playlistRouter.get('/api/playlists', playlistController.getAll);
playlistRouter.post('/api/playlists', playlistController.create);

// NOVAS ROTAS (Precisam do :id)
playlistRouter.get('/api/playlists/:id', playlistController.getById); // Buscar uma só
playlistRouter.put('/api/playlists/:id', playlistController.update);  // Renomear
playlistRouter.delete('/api/playlists/:id', playlistController.delete); // Excluir

export { playlistRouter };