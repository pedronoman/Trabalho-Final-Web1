import express from 'express';
import cors from 'cors';
import { mainRouter } from './routes/main.js';
import { playlistRouter } from './routes/playlist.js';
import { songRouter } from './routes/song.js';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.use(mainRouter);
app.use(playlistRouter);
app.use(songRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});