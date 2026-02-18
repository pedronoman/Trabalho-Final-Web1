import { prisma } from "../repository/client.js";

export class SongController {
  
  // GET ALL: Listar todas as músicas do sistema
  async getAll(request, response) {
    try {
      const songs = await prisma.song.findMany({
        include: {
          playlist: true, 
        },
      });
      return response.json(songs);
    } catch (error) {
      // ISTO VAI MOSTRAR O ERRO REAL NO TERMINAL DO SERVIDOR
      console.error("❌ ERRO AO BUSCAR MÚSICAS:", error);
      return response.status(500).json({ 
        message: "Erro interno ao buscar músicas.", 
        details: error.message 
      });
    }
  }

  // CREATE: Adicionar música
  async create(request, response) {
    const { title, artist, url, cover, playlist_id } = request.body;

    if (!title || !url || !playlist_id) {
        return response.status(400).json({ 
            message: "Título, URL e ID da Playlist são obrigatórios." 
        });
    }

    try {
      // Verifica se a playlist existe antes de conectar
      // (Opcional, mas evita erros se o ID for inválido)
      
      const song = await prisma.song.create({
        data: {
          title,
          artist: artist || "Desconhecido",
          url,
          cover,
          playlist: {
            connect: {
              id: parseInt(playlist_id),
            },
          },
        },
      });

      return response.status(201).json(song);
    } catch (error) {
      console.error("❌ ERRO AO CRIAR MÚSICA:", error);
      return response.status(400).json({
        message: "Erro ao criar música.",
        error: error.message,
      });
    }
  }

  // UPDATE
  async update(request, response) {
    const { id, title, artist, url } = request.body;

    try {
      const song = await prisma.song.update({
        where: { id: parseInt(id) },
        data: { title, artist, url },
      });
      return response.json(song);
    } catch (error) {
      console.error(error);
      response.status(400).json({ message: "Erro ao atualizar.", error });
    }
  }

  // DELETE
  async delete(request, response) {
    const { id } = request.body; 

    try {
      await prisma.song.delete({
        where: { id: parseInt(id) },
      });
      return response.json({ message: "Música removida." });
    } catch (error) {
      console.error(error);
      response.status(400).json({ message: "Erro ao deletar.", error });
    }
  }
}