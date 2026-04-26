import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { ArrowLeft, Save, X } from 'lucide-react';
import { products } from '../data/products';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function A3_ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';
  const existingProduct = !isNew && products.find((p) => p.id === id);

  const [formData, setFormData] = useState(
    existingProduct || {
      sku: '',
      name: '',
      category: 'led',
      description: '',
      price: 0,
      stock: 0,
      image: '',
      visible: true,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Товар ${isNew ? 'создан' : 'обновлён'} успешно`);
    navigate('/admin/products');
  };

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

            <Link
              to="/admin/products"
              className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              <ArrowLeft className="h-4 w-4" />
              К списку товаров
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold">
            {isNew ? 'Создание товара' : 'Редактирование товара'}
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            {isNew ? 'Заполните информацию о новом товаре' : `Артикул: ${formData.sku}`}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4 rounded-lg border border-zinc-800 bg-zinc-900/30 p-6">
              <h2 className="font-medium">Основная информация</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">
                    Артикул (SKU) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-100 transition-colors focus:border-amber-500 focus:outline-none"
                    placeholder="LZ-LED-001"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-400">
                    Категория *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as any })
                    }
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-100 transition-colors focus:border-amber-500 focus:outline-none"
                  >
                    <option value="led">Светодиодные</option>
                    <option value="incandescent">Накаливание</option>
                    <option value="fluorescent">Люминесцентные</option>
                    <option value="accessories">Комплектующие</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Название товара *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-100 transition-colors focus:border-amber-500 focus:outline-none"
                  placeholder="Светодиодная лампа E27 12W"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Описание *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-100 transition-colors focus:border-amber-500 focus:outline-none"
                  placeholder="Подробное описание товара..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">Цена (₽) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: parseFloat(e.target.value) })
                    }
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-100 transition-colors focus:border-amber-500 focus:outline-none"
                    placeholder="450"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-400">
                    Остаток (шт.) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: parseInt(e.target.value) })
                    }
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-100 transition-colors focus:border-amber-500 focus:outline-none"
                    placeholder="156"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  URL изображения *
                </label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-100 transition-colors focus:border-amber-500 focus:outline-none"
                  placeholder="https://example.com/image.jpg"
                />
                {formData.image && (
                  <div className="mt-3 aspect-video w-full overflow-hidden rounded-lg bg-zinc-900">
                    <ImageWithFallback
                      src={formData.image}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.visible}
                    onChange={(e) =>
                      setFormData({ ...formData, visible: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-zinc-800 bg-zinc-900/50 text-amber-500 focus:ring-amber-500"
                  />
                  <span className="text-sm text-zinc-300">
                    Опубликовать товар на витрине
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <motion.button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 font-medium text-zinc-950 transition-colors hover:bg-amber-400"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Save className="h-4 w-4" />
                Сохранить
              </motion.button>

              <button
                type="button"
                onClick={() => navigate('/admin/products')}
                className="flex items-center gap-2 rounded-lg border border-zinc-800 px-6 py-3 font-medium text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-100"
              >
                <X className="h-4 w-4" />
                Отмена
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
