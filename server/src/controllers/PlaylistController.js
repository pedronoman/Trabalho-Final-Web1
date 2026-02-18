import { prisma } from "../repository/client.js"; // Verifica se o caminho do client.js está correto

export class PlaylistController {

    // GET ALL: Buscar todas as playlists e suas músicas
    async getAll(request, response) {
        const playlists = await prisma.playlist.findMany({
            include: {
                songs: true // Traz todas as músicas da playlist
            }
        })
        return response.json(playlists)
    }

    // CREATE: Criar nova playlist
    async create(request, response) {
        // O frontend envia { name: "Minha Playlist" }
        const { name, description } = request.body

        if (!name || name === "") {
            return response.status(400).json({
                message: "O nome da playlist é obrigatório."
            })
        }

        try {
            const playlist = await prisma.playlist.create({
                data: {
                    name,
                    description: description || "" // Opcional
                }
            })
            return response.status(201).json(playlist)
        } catch (error) {
            return response.status(400).json({ error: "Erro ao criar playlist" })
        }
    }

    // GET BY ID
    async getById(request, response) {
        try {
            const { id } = request.params
            const playlist = await prisma.playlist.findFirstOrThrow({
                where: { id: parseInt(id) },
                include: { songs: true }
            })
            return response.json(playlist)

        } catch(error) {
            return response.status(404).json({ message: "Playlist não encontrada.", error })
        }
    }

    // DELETE
    async delete(request, response) {
        const { id } = request.body // Ou request.params, depende da tua rota

        try {
            await prisma.playlist.delete({
                where: { id: parseInt(id) }
            })
            return response.json({ message: "Playlist removida." })

        } catch(error) {
             return response.status(400).json({ message: "Erro ao remover.", error })           
        }
    }
}