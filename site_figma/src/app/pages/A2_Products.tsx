import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Search, Plus, Edit, EyeOff, Eye } from 'lucide-react';
import { products, categoryNames } from '../data/products';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function A2_Products() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="border-b border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-[1200px] px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600">
                <span className="text-sm font-bold text-zinc-950">ЛЗ</span>
              </div>
              <span className="text-lg font-medium">Панель администратора</span>
            </div>

            <nav className="flex gap-6">
              <Link
                to="/admin/products"
                className="border-b-2 border-amber-500 pb-1 text-sm font-medium text-amber-400"
              >
                Товары
              </Link>
              <Link
                to="/admin/orders"
                className="border-b-2 border-transparent pb-1 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
              >
                Заказы
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-8 py-8">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Управление товарами</h1>
              <p className="mt-1 text-sm text-zinc-400">
                Всего товаров: {products.length}
              </p>
            </div>

            <motion.button
              onClick={() => navigate('/admin/products/new')}
              className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-amber-400"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="h-4 w-4" />
              Создать товар
            </motion.button>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 py-3 pl-12 pr-4 text-sm text-zinc-100 placeholder-zinc-500 transition-colors focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/30">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50 text-left text-sm text-zinc-400">
                  <th className="px-6 py-4 font-medium">Товар</th>
                  <th className="px-6 py-4 font-medium">Артикул</th>
                  <th className="px-6 py-4 font-medium">Категория</th>
                  <th className="px-6 py-4 font-medium">Цена</th>
                  <th className="px-6 py-4 font-medium">Остаток</th>
                  <th className="px-6 py-4 font-medium">На витрине</th>
                  <th className="px-6 py-4 font-medium">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    className="border-b border-zinc-800 text-sm transition-colors hover:bg-zinc-800/30"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded bg-zinc-900">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="max-w-xs">
                          <p className="font-medium text-zinc-100">{product.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-400">{product.sku}</td>
                    <td className="px-6 py-4">
                      <span className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-300">
                        {categoryNames[product.category]}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-amber-400">
                      {product.price.toLocaleString('ru-RU')} ₽
                    </td>
                    <td className="px-6 py-4 text-zinc-400">{product.stock} шт.</td>
                    <td className="px-6 py-4">
                      {product.visible ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-400">
                          <Eye className="h-3 w-3" />
                          Виден
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-500">
                          <EyeOff className="h-3 w-3" />
                          Скрыт
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/admin/products/${product.id}`)}
                          className="flex items-center gap-1 text-amber-400 transition-colors hover:text-amber-300"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="text-xs">Редактировать</span>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
