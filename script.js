// --- DADOS E FUNÇÕES DE BANCO DE DADOS ---
let bancoDeMusicas = JSON.parse(localStorage.getItem('minhasMusicas')) || [
    {
        titulo: "Teste de Som",
        artista: "Demo",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    }
];

function adicionarMusicaAoBanco(titulo, artista, url) {
    bancoDeMusicas.push({ titulo, artista, src: url });
    localStorage.setItem('minhasMusicas', JSON.stringify(bancoDeMusicas));
    carregarMusicas(); 
    alert("Música adicionada com sucesso!");
}

// --- VARIÁVEIS GLOBAIS DE ELEMENTOS ---
const listaElemento = document.getElementById('lista-musicas');
const player = new Audio(); 
const tituloPlayer = document.getElementById('player-titulo');
const artistaPlayer = document.getElementById('player-artista');
const barraProgresso = document.getElementById('barra-progresso');

// ⚠️ CORREÇÃO 1: Faltava definir esta variável para o botão play/pause funcionar
const iconePlay = document.getElementById('icone-bt-play'); 

let indiceAtual = 0; 

// --- FUNÇÃO DE RENDERIZAÇÃO DA LISTA ---
function carregarMusicas() {
    listaElemento.innerHTML = ''; // Limpa o "music" estático

    bancoDeMusicas.forEach((musica, index) => {
        const item = document.createElement('a');
        item.className = 'list-group-item list-group-item-action border-0 py-3 bg-transparent';
        item.href = '#'; 
        
        item.onclick = () => tocarMusica(index);

        item.innerHTML = `
            <div class="d-flex w-100 justify-content-between align-items-center">
                <div>
                    <h6 class="mb-1 fw-bold">${musica.titulo}</h6>
                    <small class="text-muted">${musica.artista}</small>
                </div>
                <i class="bi bi-play-circle fs-3 text-muted"></i>
            </div>
        `;

        listaElemento.appendChild(item);
    });
}

// --- CONTROLES DE ÁUDIO ---
function tocarMusica(index) {
    indiceAtual = index;
    const musicaSelecionada = bancoDeMusicas[index];
    
    player.src = musicaSelecionada.src;
    player.play();

    tituloPlayer.innerText = musicaSelecionada.titulo;
    artistaPlayer.innerText = musicaSelecionada.artista;
    
    // Troca ícone para Pause
    if(iconePlay) {
        iconePlay.classList.remove('bi-play-fill');
        iconePlay.classList.add('bi-pause-fill');
    }
}

function proximaMusica() {
    if (indiceAtual < bancoDeMusicas.length - 1) {
        indiceAtual++;
    } else {
        indiceAtual = 0;
    }
    tocarMusica(indiceAtual);
}

function musicaAnterior() {
    if (indiceAtual > 0) {
        indiceAtual--;
    } else {
        indiceAtual = bancoDeMusicas.length - 1;
    }
    tocarMusica(indiceAtual);
}

function mudarVolume(valor) {
    player.volume = valor;
}

function mudarTempo(evento) {
    const larguraBarra = evento.currentTarget.clientWidth;
    const cliqueX = evento.offsetX;
    const duracaoTotal = player.duration;

    if (duracaoTotal) { 
        player.currentTime = (cliqueX / larguraBarra) * duracaoTotal;
    }
}

// Eventos do Player
player.onended = () => {
    proximaMusica();
};

player.ontimeupdate = () => {
    if (player.duration) {
        const progresso = (player.currentTime / player.duration) * 100;
        barraProgresso.style.width = `${progresso}%`;
    }
};

// --- PLAYLISTS ---
let minhasPlaylists = JSON.parse(localStorage.getItem('playlistsSalvas')) || [];
const listaPlaylistsElemento = document.getElementById('lista-playlists');

function desenharPlaylists() {
    listaPlaylistsElemento.innerHTML = ''; 
    minhasPlaylists.forEach(nome => {
        const li = document.createElement('li');
        li.className = 'mb-2 d-flex align-items-center text-muted';
        li.innerHTML = `<i class="bi bi-music-note-beamed me-2"></i> ${nome}`;
        listaPlaylistsElemento.appendChild(li);
    });
}

window.criarPlaylist = function() {
    const nomePlaylist = prompt("Digite o nome da sua nova Playlist:");
    if (nomePlaylist && nomePlaylist.trim() !== "") {
        minhasPlaylists.push(nomePlaylist);
        localStorage.setItem('playlistsSalvas', JSON.stringify(minhasPlaylists));
        desenharPlaylists();
    }
}

// --- ⚠️ CORREÇÃO 2: INICIALIZAÇÃO ---
// Aqui chamamos as funções para desenhar a tela assim que o script carrega
desenharPlaylists(); 
carregarMusicas(); // <--- ISTO FALTAVA! Sem isto, a lista fica com o HTML antigo.
// --- CORREÇÃO DO BOTÃO PLAY/PAUSE ---

// 1. Pegar o botão do HTML
const botaoPlayPause = document.getElementById('btn-play-pause');

// 2. O que acontece ao clicar no botão grande?
botaoPlayPause.onclick = () => {
    // Se não tiver música carregada, não faz nada
    if (!player.src || player.src === "") {
        alert("Escolha uma música na lista primeiro!");
        return;
    }

    if (player.paused) {
        player.play(); // Se está pausado, toca
    } else {
        player.pause(); // Se está tocando, pausa
    }
};

// 3. Sincronizar o ícone com o estado do áudio
// (Isso garante que o ícone mude mesmo se a música acabar sozinha)

player.onplay = () => {
    iconePlay.classList.remove('bi-play-fill');
    iconePlay.classList.add('bi-pause-fill');
};

player.onpause = () => {
    iconePlay.classList.remove('bi-pause-fill');
    iconePlay.classList.add('bi-play-fill');
};

// --- SISTEMA DE FAVORITOS ---
const btnFavorito = document.getElementById('btn-favorito');

function alternarFavorito() {
    // Verifica se já está preenchido (favoritado)
    if (btnFavorito.classList.contains('bi-heart')) {
        // Se estava vazio, vira cheio e vermelho
        btnFavorito.classList.remove('bi-heart');     // Remove borda vazia
        btnFavorito.classList.add('bi-heart-fill');   // Adiciona coração cheio
        btnFavorito.classList.add('text-danger');     // Adiciona cor vermelha
        
        console.log("Música favoritada!"); // Opcional: só para testar
    } else {
        // Se estava cheio, volta a ficar vazio e preto
        btnFavorito.classList.remove('bi-heart-fill');
        btnFavorito.classList.remove('text-danger');
        btnFavorito.classList.add('bi-heart');
        
        console.log("Removido dos favoritos.");
    }
}

// Bônus: Resetar o coração quando muda a música
// (Adiciona esta linha DENTRO da tua função tocarMusica, lá no meio)
/*
   ...dentro de tocarMusica()...
   
   // Reseta o coração para vazio ao trocar de música (para não parecer que a nova música já é favorita)
   btnFavorito.classList.remove('bi-heart-fill', 'text-danger');
   btnFavorito.classList.add('bi-heart');
*/