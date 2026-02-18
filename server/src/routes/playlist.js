import { Router } from "express";
// Importamos o controller novo
import { PlaylistController } from "../controllers/PlaylistController.js";

const playlistRouter = Router();
const playlistController = new PlaylistController();

// --- Rotas de Playlists (Antigo Projects) ---

// Get All
playlistRouter.get('/api/playlists', playlistController.getAll);

// Get By Id
playlistRouter.get('/api/playlists/:id', playlistController.getById);

// Create
playlistRouter.post('/api/playlists', playlistController.create);

// Delete
playlistRouter.delete('/api/playlists', playlistController.delete);

// (Opcional) Se implementaste o Update no controller, descomenta abaixo:
// playlistRouter.put('/api/playlists', playlistController.update);

export { playlistRouter };