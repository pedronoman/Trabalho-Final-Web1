import { Link } from 'react-router-dom';
import { Home, Heart, Music } from 'lucide-react'; // Ícones bonitos

export function Menu() {
  return (
    <nav className="flex flex-col gap-4">
      <Link to="/" className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition font-medium">
        <Home size={20} />
        Início
      </Link>
      
      <Link to="/" className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition font-medium">
        <Music size={20} />
        Minha Biblioteca
      </Link>

      <div className="mt-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Sua Coleção</h3>
        <Link to="#" className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition font-medium">
          <Heart size={20} />
          Músicas Curtidas
        </Link>
      </div>
    </nav>
  );
}