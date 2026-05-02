import { Link, Outlet } from 'react-router';
import { ShoppingCart, Lightbulb } from 'lucide-react';
import { useCart } from '../store/cart';
import { motion } from 'motion/react';

export function Layout() {
  const itemCount = useCart((state) => state.getItemCount());

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-[1200px] px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Lightbulb className="h-6 w-6 text-zinc-950" />
              </motion.div>
              <span className="text-xl tracking-tight">ЛюменЗавод</span>
            </Link>

            <nav className="flex items-center gap-4 sm:gap-8">
              <Link
                to="/"
                className="text-sm text-zinc-400 transition-colors hover:text-amber-400"
              >
                Каталог
              </Link>
              <Link
                to="/cart"
                className="relative flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-amber-400"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Корзина</span>
                {itemCount > 0 && (
                  <motion.span
                    className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-medium text-zinc-950"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  >
                    {itemCount}
                  </motion.span>
                )}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <Outlet />
      </main>

      <footer className="border-t border-zinc-800 bg-zinc-950/50 py-8">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-zinc-500">
            © 2026 ЛюменЗавод. Производство светотехники
          </p>
        </div>
      </footer>
    </div>
  );
}
