import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'app');

const adminLayout = `import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { LogOut } from 'lucide-react';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/authSlice';

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isProducts = location.pathname.startsWith('/admin/products');
  const isOrders = location.pathname.startsWith('/admin/orders');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="border-b border-zinc-200 bg-white shadow-sm">
        <div className="mx-auto max-w-[1200px] px-4 py-4 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600">
                <span className="text-sm font-bold text-white">ЛЗ</span>
              </div>
              <span className="text-lg font-medium text-zinc-900">Панель администратора</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <nav className="flex gap-6">
                <Link
                  to="/admin/products"
                  className={
                    isProducts
                      ? 'border-b-2 border-amber-500 pb-1 text-sm font-medium text-amber-700'
                      : 'border-b-2 border-transparent pb-1 text-sm text-zinc-600 hover:text-zinc-900'
                  }
                >
                  Товары
                </Link>
                <Link
                  to="/admin/orders"
                  className={
                    isOrders
                      ? 'border-b-2 border-amber-500 pb-1 text-sm font-medium text-amber-700'
                      : 'border-b-2 border-transparent pb-1 text-sm text-zinc-600 hover:text-zinc-900'
                  }
                >
                  Заказы
                </Link>
              </nav>
              <Link to="/" className="text-sm text-zinc-600 hover:text-amber-600">
                На сайт
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-zinc-600 hover:text-red-600"
              >
                <LogOut className="h-4 w-4" />
                Выход
              </button>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
`;

fs.writeFileSync(path.join(dir, 'components', 'AdminLayout.tsx'), adminLayout, 'utf8');
console.log('wrote AdminLayout.tsx');
