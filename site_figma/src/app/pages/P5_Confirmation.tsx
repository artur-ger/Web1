import { useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { CheckCircle, Package } from 'lucide-react';
import { motion } from 'motion/react';
import { fetchOrderByNumber } from '../store/ordersSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export function P5_Confirmation() {
  const { orderNumber } = useParams();
  const dispatch = useAppDispatch();
  const { currentOrder, status, error } = useAppSelector((state) => state.orders);

  useEffect(() => {
    if (orderNumber) {
      dispatch(fetchOrderByNumber(orderNumber));
    }
  }, [dispatch, orderNumber]);

  if (status === 'loading') {
    return <p className="text-zinc-400">Загрузка заказа...</p>;
  }

  if (!currentOrder) {
    return (
      <div className="py-20 text-center">
        <p className="text-zinc-500">{error || 'Заказ не найден'}</p>
        <Link to="/" className="mt-4 inline-block text-amber-400 hover:text-amber-300">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      className="mx-auto max-w-2xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-6 text-center sm:p-10 lg:p-12">
        <motion.div
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 10 }}
        >
          <CheckCircle className="h-10 w-10 text-green-400" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
            Заказ успешно оформлен!
          </h1>
          <p className="mt-2 text-zinc-400">
            Мы отправили подтверждение на {currentOrder.customer_email}
          </p>
        </motion.div>

        <motion.div
          className="mt-8 space-y-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-start gap-3">
            <Package className="mt-1 h-5 w-5 shrink-0 text-amber-400" />
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-sm text-zinc-500">Номер заказа</p>
                <p className="text-lg font-medium">{orderNumber}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                <div>
                  <p className="text-zinc-500">Сумма заказа</p>
                  <p className="font-medium text-amber-400">
                    {currentOrder.total_amount.toLocaleString('ru-RU')} ₽
                  </p>
                </div>
                <div>
                  <p className="text-zinc-500">Статус</p>
                  <p className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2 py-0.5 font-medium text-green-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    Принят
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-zinc-500">Адрес доставки</p>
                <p className="mt-1 text-zinc-300">{currentOrder.delivery_address}</p>
              </div>

              <div>
                <p className="text-sm text-zinc-500">Контактное лицо</p>
                <p className="mt-1 text-zinc-300">{currentOrder.customer_name}</p>
                <p className="text-sm text-zinc-400">{currentOrder.customer_phone}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-zinc-500">
            Наш менеджер свяжется с вами в ближайшее время для подтверждения заказа
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-lg bg-amber-500 px-8 py-3 font-medium text-zinc-950 transition-colors hover:bg-amber-400"
          >
            Вернуться в каталог
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
