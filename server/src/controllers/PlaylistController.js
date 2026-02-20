import { prisma } from "../repository/client.js";

export class PlaylistController {
  
  // Buscar todas
  async getAll(request, response) {
    const playlists = await prisma.playlist.findMany({
        include: { songs: true }
    });
    return response.json(playlists);
  }

  // Buscar UMA (com músicas)
  async getById(request, response) {
    const { id } = request.params;
    try {
        const playlist = await prisma.playlist.findUnique({
            where: { id: parseInt(id) },
            include: { songs: true }
        });
        return response.json(playlist);
    } catch (error) {
        return response.status(400).json({ message: "Playlist não encontrada" });
    }
  }

  // Criar
  async create(request, response) {
    const { name } = request.body;
    try {
      const playlist = await prisma.playlist.create({
        data: { name }
      });
      return response.status(201).json(playlist);
    } catch (error) {
      return response.status(400).json({ message: "Erro ao criar playlist" });
    }
  }

  // ATUALIZAR (Renomear)
  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    try {
      const playlist = await prisma.playlist.update({
        where: { id: parseInt(id) },
        data: { name }
      });
      return response.json(playlist);
    } catch (error) {
      return response.status(400).json({ message: "Erro ao atualizar" });
    }
  }

  // DELETAR
  async delete(request, response) {
    const { id } = request.params;
    try {
      await prisma.playlist.delete({
        where: { id: parseInt(id) }
      });
      return response.json({ message: "Playlist removida" });
    } catch (error) {
      return response.status(400).json({ message: "Erro ao deletar" });
    }
  }
}