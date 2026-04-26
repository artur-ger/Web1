import { Link, useNavigate } from 'react-router';
import { Search, Package } from 'lucide-react';
import { orders, statusNames } from '../data/orders';
import { motion } from 'motion/react';
import { useState } from 'react';

export function A4_Orders() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredOrders = orders.filter(
    (order) =>
      order.number.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(search.toLowerCase())
  );

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

            <nav className="flex gap-6">
              <Link
                to="/admin/products"
                className="border-b-2 border-transparent pb-1 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
              >
                Товары
              </Link>
              <Link
                to="/admin/orders"
                className="border-b-2 border-amber-500 pb-1 text-sm font-medium text-amber-400"
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
          <div>
            <h1 className="text-2xl font-bold">Управление заказами</h1>
            <p className="mt-1 text-sm text-zinc-400">Всего заказов: {orders.length}</p>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Поиск по номеру или имени клиента..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 py-3 pl-12 pr-4 text-sm text-zinc-100 placeholder-zinc-500 transition-colors focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/30">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50 text-left text-sm text-zinc-400">
                  <th className="px-6 py-4 font-medium">Номер заказа</th>
                  <th className="px-6 py-4 font-medium">Дата</th>
                  <th className="px-6 py-4 font-medium">Клиент</th>
                  <th className="px-6 py-4 font-medium">Телефон</th>
                  <th className="px-6 py-4 font-medium">Сумма</th>
                  <th className="px-6 py-4 font-medium">Статус</th>
                  <th className="px-6 py-4 font-medium">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    className="border-b border-zinc-800 text-sm transition-colors hover:bg-zinc-800/30"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-zinc-600" />
                        <span className="font-medium text-zinc-100">
                          {order.number}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-400">{order.date}</td>
                    <td className="px-6 py-4 text-zinc-300">{order.customer.name}</td>
                    <td className="px-6 py-4 text-zinc-400">
                      {order.customer.phone}
                    </td>
                    <td className="px-6 py-4 font-medium text-amber-400">
                      {order.total.toLocaleString('ru-RU')} ₽
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(order.status)}`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {statusNames[order.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/admin/orders/${order.id}`)}
                        className="text-amber-400 transition-colors hover:text-amber-300"
                      >
                        Открыть →
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-zinc-500">Заказы не найдены</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
