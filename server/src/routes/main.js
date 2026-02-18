import { Router } from "express";

const mainRouter = Router();

mainRouter.get('/', (request, response) => {
    // Mudamos o título para o teu projeto
    response.send("<h1>Spotify Clone Server 🎵</h1>");
})

mainRouter.get('/status', (request, response) => {
    response.json({
        code: 200,
        message: "Spotify Clone API is running smoothly!"
    })
})

mainRouter.get('/admin', (request, response) => {
    response.status(401).send("<h1>Unauthorized.</h1>");
})

export { mainRouter };