import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Trash2, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { resolveCartLineImage } from '../utils/productImage';
import { changeCartItemQuantity, deleteCartItem, loadCart } from '../store/cartSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export function P3_Cart() {
  const dispatch = useAppDispatch();
  const catalogProducts = useAppSelector((state) => state.products.items);
  const { value: cart, status, mutationStatus, error } = useAppSelector((state) => state.cart);
  const navigate = useNavigate();
  const items = cart?.items || [];
  const total = cart?.total_amount || 0;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadCart());
    }
  }, [dispatch, status]);

  if (status === 'loading' && !cart) {
    return <p className="text-zinc-400">Загрузка корзины...</p>;
  }

  if (items.length === 0) {
    return (
      <motion.div
        className="py-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ShoppingBag className="mx-auto h-16 w-16 text-zinc-700" />
        <h2 className="mt-6 text-2xl font-bold">Корзина пуста</h2>
        <p className="mt-2 text-zinc-400">Добавьте товары из каталога</p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-lg bg-amber-500 px-8 py-3 font-medium text-zinc-950 transition-colors hover:bg-amber-400"
        >
          Перейти в каталог
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Корзина</h1>
        <p className="mt-2 text-zinc-400">
          {items.length} {items.length === 1 ? 'товар' : 'товара'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className="flex flex-col gap-4 rounded-lg border border-zinc-800 bg-zinc-900/30 p-4 sm:flex-row sm:gap-6 sm:p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-zinc-900">
                <ImageWithFallback
                  src={resolveCartLineImage(
                    item.product_id,
                    item.product_image_snapshot,
                    catalogProducts.find((p) => p.id === item.product_id)?.sku,
                  )}
                  alt={item.product_name_snapshot}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="font-medium">{item.product_name_snapshot}</h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    {item.unit_price_snapshot.toLocaleString('ru-RU')} ₽
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      dispatch(changeCartItemQuantity({ itemId: item.id, quantity: item.quantity - 1 }))
                    }
                    disabled={mutationStatus === 'loading'}
                    className="flex h-8 w-8 items-center justify-center rounded border border-zinc-800 bg-zinc-900/50 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-100"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      dispatch(changeCartItemQuantity({ itemId: item.id, quantity: item.quantity + 1 }))
                    }
                    disabled={mutationStatus === 'loading'}
                    className="flex h-8 w-8 items-center justify-center rounded border border-zinc-800 bg-zinc-900/50 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-row items-center justify-between sm:flex-col sm:items-end">
                <p className="text-lg font-medium text-amber-400">
                  {item.line_total.toLocaleString('ru-RU')} ₽
                </p>
                <button
                    onClick={() => dispatch(deleteCartItem(item.id))}
                    disabled={mutationStatus === 'loading'}
                  className="flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                  Удалить
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-6">
            <h2 className="text-lg font-medium">Итого</h2>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Товары:</span>
                <span>{total.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Доставка:</span>
                <span className="text-green-400">Бесплатно</span>
              </div>

              <div className="border-t border-zinc-800 pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">К оплате:</span>
                  <span className="text-2xl font-bold text-amber-400">
                    {total.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>
            </div>

            <motion.button
              onClick={() => navigate('/checkout')}
              className="mt-6 w-full rounded-lg bg-amber-500 py-3 font-medium text-zinc-950 transition-colors hover:bg-amber-400"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Оформить заказ
            </motion.button>

            <Link
              to="/"
              className="mt-3 block text-center text-sm text-zinc-400 transition-colors hover:text-amber-400"
            >
              Продолжить покупки
            </Link>
          </div>
        </motion.div>
      </div>
      {error && <p className="text-sm text-red-300">{error}</p>}
    </motion.div>
  );
}
