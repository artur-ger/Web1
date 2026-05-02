import { useState } from 'react';
import { Link } from 'react-router';
import { Search } from 'lucide-react';
import { products, categoryNames } from '../data/products';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function P1_Catalog() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || product.category === category;
    return matchesSearch && matchesCategory && product.visible;
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Каталог продукции</h1>
          <p className="mt-2 text-zinc-400">
            Профессиональное светотехническое оборудование от производителя
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Поиск по названию..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 py-3 pl-12 pr-4 text-sm text-zinc-100 placeholder-zinc-500 transition-colors focus:border-amber-500 focus:outline-none"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-100 transition-colors focus:border-amber-500 focus:outline-none sm:w-auto sm:px-6"
          >
            <option value="all">Все категории</option>
            <option value="led">Светодиодные</option>
            <option value="incandescent">Накаливание</option>
            <option value="fluorescent">Люминесцентные</option>
            <option value="accessories">Комплектующие</option>
          </select>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index, duration: 0.4 }}
          >
            <Link
              to={`/product/${product.id}`}
              className="group block space-y-4 transition-transform hover:scale-[1.02]"
            >
              <div className="aspect-square overflow-hidden rounded-lg bg-zinc-900/50">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="line-clamp-2 text-sm text-zinc-100">
                    {product.name}
                  </h3>
                  <span className="shrink-0 rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
                    {categoryNames[product.category]}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium text-amber-400">
                    {product.price.toLocaleString('ru-RU')} ₽
                  </p>
                  <span className="text-sm font-medium text-amber-500 opacity-0 transition-opacity group-hover:opacity-100">
                    Подробнее →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {filteredProducts.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-zinc-500">Товары не найдены</p>
        </div>
      )}
    </div>
  );
}
