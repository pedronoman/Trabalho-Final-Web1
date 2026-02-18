import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Library } from './pages/Library';
// Podes remover as importações de projects e tasks antigas

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // O Layout principal (com o Menu e o Header)
    children: [
      {
        path: '/', // A página inicial será a Biblioteca
        element: <Library />,
      },
      // Futuramente podemos adicionar:
      // { path: '/playlist/:id', element: <PlaylistDetails /> }
    ],
  },
]);