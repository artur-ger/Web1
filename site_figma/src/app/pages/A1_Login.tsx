import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Lightbulb } from 'lucide-react';
import { motion } from 'motion/react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginAdmin } from '../store/authSlice';

const inputClass =
  'w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20';

export function A1_Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((s) => s.auth);
  const [formData, setFormData] = useState({ login: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginAdmin(formData)).unwrap();
      navigate('/admin/products');
    } catch {
      // handled in store
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
      <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600">
            <Lightbulb className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-zinc-900">ЛюменЗавод</h1>
          <p className="mt-2 text-sm text-zinc-600">Панель администратора</p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-8 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              required
              placeholder="Логин"
              value={formData.login}
              onChange={(e) => setFormData({ ...formData, login: e.target.value })}
              className={inputClass}
            />
            <input
              type="password"
              required
              placeholder="Пароль"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={inputClass}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full rounded-lg bg-amber-500 py-3 font-medium text-white hover:bg-amber-600 disabled:opacity-50"
            >
              {status === 'loading' ? 'Вход...' : 'Войти'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-zinc-600 hover:text-amber-600">
              На сайт
            </Link>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-zinc-500">admin / admin</p>
      </motion.div>
    </div>
  );
}
