import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../store/hooks';
import { adminApi } from '../store/adminApi';
import type { Order } from '../store/types';
import { ORDER_STATUS_LABELS, statusBadgeClass } from '../utils/orderStatus';

export function A4_Orders() {
  const navigate = useNavigate();
  const token = useAppSelector((s) => s.auth.token);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!token) return;
    adminApi.getAdminOrders(token).then((r) => setOrders(r.items));
  }, [token]);

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8">
      <h1 className="text-2xl font-bold">Заказы</h1>
      <div className="mt-6 overflow-x-auto rounded-lg border border-zinc-200 bg-white shadow-sm">
        <table className="w-full min-w-[600px] text-sm text-zinc-900">
          <thead className="bg-zinc-50 text-zinc-600">
            <tr>
              <th className="px-4 py-2 text-left">Номер</th>
              <th className="px-4 py-2 text-left">Клиент</th>
              <th className="px-4 py-2 text-left">Сумма</th>
              <th className="px-4 py-2 text-left">Статус</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-zinc-200">
                <td className="px-4 py-2">{o.order_number}</td>
                <td className="px-4 py-2">{o.customer_name}</td>
                <td className="px-4 py-2">{o.total_amount} ₽</td>
                <td className="px-4 py-2">
                  <span className={`rounded px-2 py-0.5 text-xs ${statusBadgeClass(o.status)}`}>
                    {ORDER_STATUS_LABELS[o.status] || o.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button type="button" onClick={() => navigate(`/admin/orders/${o.id}`)}>
                    Открыть
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
