import express from 'express';
import cors from 'cors'; //
// NOVAS IMPORTAÇÕES
import { mainRouter } from './routes/main.js';
import { playlistRouter } from './routes/playlist.js'; // Mudou de project.js
import { songRouter } from './routes/song.js';         // Mudou de task.js

const app = express();
const PORT = 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Usar as Rotas Novas
app.use(mainRouter);
app.use(playlistRouter); // Antes era projectRouter
app.use(songRouter);     // Antes era taskRouter

// Iniciar Servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});