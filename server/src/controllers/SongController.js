import { prisma } from "../repository/client.js";

export class SongController {
  
  // GET ALL: Listar todas as músicas do sistema
  async getAll(request, response) {
    const songs = await prisma.song.findMany({
      include: {
        playlist: true, // Mostra a qual playlist pertence
      },
    });
    return response.json(songs);
  }

  // CREATE: Adicionar música
  async create(request, response) {
    // Atenção aos campos novos que definimos no Schema!
    const { title, artist, url, cover, playlist_id } = request.body;

    // Validação básica
    if (!title || !url || !playlist_id) {
        return response.status(400).json({ 
            message: "Título, URL e ID da Playlist são obrigatórios." 
        });
    }

    try {
      const song = await prisma.song.create({
        data: {
          title,
          artist: artist || "Desconhecido", // Valor padrão se não vier
          url,
          cover,
          playlist: {
            connect: {
              id: parseInt(playlist_id), // Conecta à tabela Playlist
            },
          },
        },
      });

      return response.status(201).json(song);
    } catch (error) {
      console.error(error);
      return response.status(400).json({
        message: "Erro ao criar música.",
        error,
      });
    }
  }

  // UPDATE: Editar música
  async update(request, response) {
    const { id, title, artist, url } = request.body;

    try {
      const song = await prisma.song.update({
        where: { id: parseInt(id) },
        data: {
          title,
          artist,
          url
        },
      });
      return response.json(song);
    } catch (error) {
      response.status(400).json({ message: "Erro ao atualizar.", error });
    }
  }

  // DELETE: Remover música
  async delete(request, response) {
    const { id } = request.body; // ou params

    try {
      await prisma.song.delete({
        where: { id: parseInt(id) },
      });

      return response.json({ message: "Música removida." });
    } catch (error) {
      response.status(400).json({ message: "Erro ao deletar.", error });
    }
  }
}