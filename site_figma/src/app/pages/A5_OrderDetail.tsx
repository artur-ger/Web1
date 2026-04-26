import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, Package, User, MapPin, Phone, Mail, MessageSquare } from 'lucide-react';
import { orders, statusNames } from '../data/orders';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function A5_OrderDetail() {
  const { id } = useParams();
  const order = orders.find((o) => o.id === id);
  const [status, setStatus] = useState(order?.status || 'new');

  if (!order) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <p className="text-zinc-500">Заказ не найден</p>
            <Link
              to="/admin/orders"
              className="mt-4 inline-block text-amber-400 hover:text-amber-300"
            >
              Вернуться к списку заказов
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleStatusChange = () => {
    alert(`Статус заказа изменён на: ${statusNames[status as keyof typeof statusNames]}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500/10 text-blue-400';
      case 'processing':
        return 'bg-amber-500/10 text-amber-400';
      case 'shipped':
        return 'bg-purple-500/10 text-purple-400';
      case 'delivered':
        return 'bg-green-500/10 text-green-400';
      case 'cancelled':
        return 'bg-red-500/10 text-red-400';
      default:
        return 'bg-zinc-800 text-zinc-400';
    }
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
              to="/admin/orders"
              className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              <ArrowLeft className="h-4 w-4" />
              К списку заказов
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-8 py-8">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Package className="h-6 w-6 text-amber-400" />
                <h1 className="text-2xl font-bold">{order.number}</h1>
              </div>
              <p className="mt-2 text-sm text-zinc-400">Дата заказа: {order.date}</p>
            </div>

            <span
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${getStatusColor(order.status)}`}
            >
              <span className="h-2 w-2 rounded-full bg-current" />
              {statusNames[order.status]}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 space-y-6">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-6">
                <h2 className="mb-6 font-medium">Состав заказа</h2>

                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"
                    >
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded bg-zinc-900">
                        <ImageWithFallback
                          src={item.productImage}
                          alt={item.productName}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-medium text-zinc-100">
                          {item.productName}
                        </h3>
                        <p className="mt-1 text-sm text-zinc-400">
                          {item.price.toLocaleString('ru-RU')} ₽ × {item.quantity} шт.
                        </p>
                      </div>

                      <p className="text-lg font-medium text-amber-400">
                        {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                      </p>
                    </div>
                  ))}

                  <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
                    <span className="font-medium">Итого:</span>
                    <span className="text-2xl font-bold text-amber-400">
                      {order.total.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-6">
                <h2 className="mb-6 font-medium">Управление статусом</h2>

                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <label className="mb-2 block text-sm text-zinc-400">
                      Изменить статус заказа
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-100 transition-colors focus:border-amber-500 focus:outline-none"
                    >
                      <option value="new">Принят</option>
                      <option value="processing">В обработке</option>
                      <option value="shipped">Отправлен</option>
                      <option value="delivered">Доставлен</option>
                      <option value="cancelled">Отменён</option>
                    </select>
                  </div>

                  <motion.button
                    onClick={handleStatusChange}
                    className="rounded-lg bg-amber-500 px-6 py-3 font-medium text-zinc-950 transition-colors hover:bg-amber-400"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Применить
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-6">
                <div className="mb-4 flex items-center gap-2 text-zinc-400">
                  <User className="h-4 w-4" />
                  <h2 className="text-sm font-medium">Контактное лицо</h2>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-zinc-500">ФИО</p>
                    <p className="mt-1 text-sm text-zinc-100">
                      {order.customer.name}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-zinc-600" />
                    <div>
                      <p className="text-sm text-zinc-500">Телефон</p>
                      <p className="mt-1 text-sm text-zinc-100">
                        {order.customer.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-zinc-600" />
                    <div>
                      <p className="text-sm text-zinc-500">Email</p>
                      <p className="mt-1 text-sm text-zinc-100">
                        {order.customer.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-6">
                <div className="mb-4 flex items-center gap-2 text-zinc-400">
                  <MapPin className="h-4 w-4" />
                  <h2 className="text-sm font-medium">Адрес доставки</h2>
                </div>

                <p className="text-sm leading-relaxed text-zinc-100">
                  {order.customer.address}
                </p>
              </div>

              {order.customer.comment && (
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-6">
                  <div className="mb-4 flex items-center gap-2 text-zinc-400">
                    <MessageSquare className="h-4 w-4" />
                    <h2 className="text-sm font-medium">Комментарий</h2>
                  </div>

                  <p className="text-sm leading-relaxed text-zinc-300">
                    {order.customer.comment}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
