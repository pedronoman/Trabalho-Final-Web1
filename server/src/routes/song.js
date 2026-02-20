import { Router } from "express";
import { SongController } from "../controllers/SongController.js";

const songRouter = Router();
const songController = new SongController();

const url = '/api/songs';

// Get ALL
songRouter.get(url, songController.getAll);

// Create
songRouter.post(url, songController.create);

// Update (Editar música)
songRouter.patch(url, songController.update);
songRouter.put(url, songController.update);

// Delete
songRouter.delete(url, songController.delete);

// Adiciona esta linha junto das outras rotas de músicas:
songRouter.patch('/api/songs/:id/favorite', songController.toggleFavorite);

export { songRouter };