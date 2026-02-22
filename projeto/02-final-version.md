# 🎵 Web Music Player (Clone Spotify) - Versão Final

**Disciplina:** Sistemas Web 1  
**Discente:** Pedro Barreto Nomam de Paula  

---

## 📌 1. Resumo do Projeto (Escopo e Domínio)
O projeto consiste em uma aplicação web *Single Page Application* (SPA) focada na gestão e reprodução de faixas musicais, fortemente inspirada no Spotify. O domínio foca na organização de bibliotecas musicais pessoais, permitindo ao usuário adicionar músicas via URLs diretas, organizá-las em playlists, marcar favoritas e reproduzi-las em um player contínuo sem interrupções durante a navegação.

---

## 🚀 2. Funcionalidades Implementadas
Conforme os requisitos estabelecidos na proposta, as seguintes funcionalidades foram entregues com sucesso:

* **Gerenciamento de Biblioteca:** Adição de músicas através de URLs de áudio (MP3/OGG).
* **Validação Inteligente de Áudio:** Implementação de um validador no Front-end que testa a URL em um player em segundo plano antes de salvar no banco, prevenindo links quebrados ou formatos inválidos.
* **Reprodutor de Áudio Completo (Player):** Player fixo no rodapé com controles de *Play*, *Pause*, *Avançar*, *Retroceder*, controle de volume funcional, barra de progresso arrastável e funcionalidade de *Auto-play* (avança para a próxima faixa automaticamente).
* **Gerenciamento de Playlists (CRUD):** Criação, listagem, edição de nome (renomear) e exclusão de playlists com atualização em tempo real na interface.
* **Sistema de Favoritos:** Botão de "Coração" para favoritar/desfavoritar músicas com persistência no banco de dados.
* **Busca Dinâmica:** Barra de pesquisa na biblioteca que filtra músicas por título ou artista instantaneamente.

---

## ⚙️ 3. Arquitetura e Tecnologias Utilizadas

O projeto foi dividido em duas frentes, utilizando tecnologias modernas e seguindo boas práticas de engenharia de software:

### 🖥️ Back-end (API RESTful)
* **Node.js + Express:** Criação do servidor e rotas da API.
* **Padrão MVC:** Organização do código separando a lógica de roteamento (`routes/`) e as regras de negócio (`controllers/`).
* **Prisma ORM & SQLite:** Modelagem do banco de dados relacional gerenciando as entidades `Playlist` e `Song`, facilitando as operações de banco e *migrations*.

### 🎨 Front-end (SPA)
* **React + TypeScript + Vite:** Base da aplicação garantindo tipagem estática para evitar erros em tempo de execução e build otimizada.
* **Tailwind CSS:** Construção da interface responsiva e implementação do tema noturno (*Dark Mode*), oferecendo uma experiência visual agradável e moderna (UI/UX).
* **Context API (Gerenciamento de Estado):** Utilização de contextos globais (`PlayerContext` e `PlaylistContext`) para evitar *prop-drilling*. Isso permite que a música continue tocando enquanto o usuário navega e garante que alterações no banco (como deletar uma playlist) atualizem o menu lateral instantaneamente, sem necessidade de *refresh* (F5).
* **React Router Dom:** Gerenciamento de rotas dinâmicas no Front-end (`/` e `/playlist/:id`).

---

## 📸 4. Resultados Visuais (Telas)

*Abaixo estão as capturas de tela demonstrando a interface final e responsiva da aplicação*

 <img width="1875" height="985" alt="image" src="https://github.com/user-attachments/assets/8a3d1ce3-c035-400a-aa0b-1c5512159722" />

 <img width="1864" height="1031" alt="image" src="https://github.com/user-attachments/assets/2ee6a3d2-1c91-4103-8d9c-de075573dfd4" />


---
