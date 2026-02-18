import { Outlet } from 'react-router-dom';
import { Menu } from './components/Menu';

function App() {
  return (
    <div className="flex h-screen bg-white">
      {/* Menu Lateral Fixo */}
      <aside className="w-64 border-r bg-gray-50">
        <div className="p-6">
          <Menu />
        </div>
      </aside>

      {/* Área Principal (Onde a Library vai aparecer) */}
      <main className="flex-1 overflow-auto bg-white">
        <Outlet />
      </main>
    </div>
  );
}

export default App;