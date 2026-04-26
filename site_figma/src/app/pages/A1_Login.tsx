import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Lightbulb, Lock } from 'lucide-react';
import { motion } from 'motion/react';

export function A1_Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ login: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    if (formData.login === 'admin' && formData.password === 'admin') {
      localStorage.setItem('admin_auth', 'true');
      navigate('/admin/products');
    } else {
      alert('Неверный логин или пароль. Используйте admin/admin');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 text-center">
          <motion.div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <Lightbulb className="h-8 w-8 text-zinc-950" />
          </motion.div>
          <h1 className="mt-4 text-2xl font-bold text-zinc-100">ЛюменЗавод</h1>
          <p className="mt-2 text-sm text-zinc-400">Панель администратора</p>
        </div>

        <motion.div
          className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-6 flex items-center gap-2 text-zinc-400">
            <Lock className="h-4 w-4" />
            <span className="text-sm">Вход в систему</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login" className="mb-2 block text-sm text-zinc-400">
                Логин
              </label>
              <input
                id="login"
                type="text"
                required
                value={formData.login}
                onChange={(e) => setFormData({ ...formData, login: e.target.value })}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-100 transition-colors focus:border-amber-500 focus:outline-none"
                placeholder="admin"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm text-zinc-400">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-100 transition-colors focus:border-amber-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <motion.button
              type="submit"
              className="w-full rounded-lg bg-amber-500 py-3 font-medium text-zinc-950 transition-colors hover:bg-amber-400"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              Войти
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-zinc-500 transition-colors hover:text-amber-400"
            >
              ← На сайт
            </Link>
          </div>
        </motion.div>

        <p className="mt-4 text-center text-xs text-zinc-600">
          Демо: admin / admin
        </p>
      </motion.div>
    </div>
  );
}
