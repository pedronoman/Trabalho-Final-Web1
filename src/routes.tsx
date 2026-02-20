import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Library } from './pages/Library';
import { PlaylistDetails } from './pages/PlaylistDetails'; // Importa a nova página

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Library />,
      },
      {
        path: '/playlist/:id', // Rota dinâmica (o :id muda)
        element: <PlaylistDetails />,
      }
    ],
  },
]);