import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { resolveCartLineImage } from '../utils/productImage';
import { createOrder } from '../store/ordersSlice';
import { loadCart } from '../store/cartSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export function P4_Checkout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const catalogProducts = useAppSelector((state) => state.products.items);
  const { value: cart, status: cartStatus } = useAppSelector((state) => state.cart);
  const { status: orderStatus, error: orderError } = useAppSelector((state) => state.orders);
  const items = cart?.items || [];
  const total = cart?.total_amount || 0;
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: '',
    agree: false,
  });

  useEffect(() => {
    if (cartStatus === 'idle') {
      dispatch(loadCart());
    }
  }, [dispatch, cartStatus]);

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-zinc-500">Корзина пуста</p>
        <Link to="/" className="mt-4 inline-block text-amber-400 hover:text-amber-300">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      createOrder({
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_email: formData.email,
        delivery_address: formData.address,
        delivery_comment: formData.comment,
      }),
    )
      .unwrap()
      .then((order) => {
        dispatch(loadCart());
        navigate(`/confirmation/${order.order_number}`);
      });
  };

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to="/cart"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-amber-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Назад в корзину
      </Link>

      <div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Оформление заказа</h1>
        <p className="mt-2 text-zinc-400">Заполните данные для доставки</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-2">
          <motion.div
            className="space-y-4 rounded-lg border border-zinc-800 bg-zinc-900/30 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="font-medium">Контактные данные</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm text-zinc-400">
                  ФИО *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-100 transition-colors focus:border-amber-500 focus:outline-none"
                  placeholder="Иванов Иван Иванович"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm text-zinc-400">
                    Телефон *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-100 transition-colors focus:border-amber-500 focus:outline-none"
                    placeholder="+7 (900) 123-45-67"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm text-zinc-400">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-100 transition-colors focus:border-amber-500 focus:outline-none"
                    placeholder="example@email.com"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-4 rounded-lg border border-zinc-800 bg-zinc-900/30 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-medium">Адрес доставки</h2>

            <div>
              <label htmlFor="address" className="mb-2 block text-sm text-zinc-400">
                Полный адрес *
              </label>
              <textarea
                id="address"
                required
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                rows={3}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-100 transition-colors focus:border-amber-500 focus:outline-none"
                placeholder="Город, улица, дом, квартира"
              />
            </div>

            <div>
              <label htmlFor="comment" className="mb-2 block text-sm text-zinc-400">
                Комментарий к заказу
              </label>
              <textarea
                id="comment"
                value={formData.comment}
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
                rows={2}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-100 transition-colors focus:border-amber-500 focus:outline-none"
                placeholder="Дополнительная информация для курьера"
              />
            </div>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                required
                checked={formData.agree}
                onChange={(e) =>
                  setFormData({ ...formData, agree: e.target.checked })
                }
                className="mt-1 h-4 w-4 rounded border-zinc-800 bg-zinc-900/50 text-amber-500 focus:ring-amber-500"
              />
              <span className="text-sm text-zinc-400">
                Я согласен с условиями обработки персональных данных и политикой
                конфиденциальности
              </span>
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <motion.button
                type="submit"
                disabled={orderStatus === 'loading'}
                className="flex-1 rounded-lg bg-amber-500 py-3 font-medium text-zinc-950 transition-colors hover:bg-amber-400"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {orderStatus === 'loading' ? 'Оформление...' : 'Подтвердить заказ'}
              </motion.button>
              <Link
                to="/cart"
                className="rounded-lg border border-zinc-800 px-6 py-3 text-center font-medium text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-100"
              >
                Назад в корзину
              </Link>
            </div>
          </motion.div>
        </form>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-6">
            <h2 className="font-medium">Ваш заказ</h2>

            <div className="mt-6 space-y-3">
              {items.map((item) => (
                <div key={item.product_id} className="flex items-start gap-3">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded bg-zinc-900">
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
                  <div className="flex-1 text-sm">
                    <p className="line-clamp-2 text-zinc-300">{item.product_name_snapshot}</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {item.quantity} × {item.unit_price_snapshot.toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-medium">
                    {item.line_total.toLocaleString('ru-RU')} ₽
                  </p>
                </div>
              ))}

              <div className="border-t border-zinc-800 pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Итого:</span>
                  <span className="text-2xl font-bold text-amber-400">
                    {total.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {orderError && <p className="text-sm text-red-300">{orderError}</p>}
    </motion.div>
  );
}
