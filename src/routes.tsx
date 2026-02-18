import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Library } from './pages/Library';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // O Layout principal
    children: [
      {
        path: '/', // Quando entrares no site (raiz), carrega a Library
        element: <Library />,
      },
      // Aqui removemos todas as rotas antigas de projects/tasks
    ],
  },
]);