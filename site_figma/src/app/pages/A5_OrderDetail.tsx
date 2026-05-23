import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { useAppSelector } from '../store/hooks';
import { adminApi } from '../store/adminApi';
import type { Order } from '../store/types';
import { ORDER_STATUS_LABELS, ORDER_STATUS_NEXT, statusBadgeClass } from '../utils/orderStatus';

export function A5_OrderDetail() {
  const { id } = useParams();
  const token = useAppSelector((s) => s.auth.token);
  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !id) return;
    adminApi.getAdminOrder(token, id).then((o) => {
      setOrder(o);
      setStatus(o.status);
    });
  }, [token, id]);

  const saveStatus = async () => {
    if (!token || !id) return;
    try {
      const updated = await adminApi.patchOrderStatus(token, id, status);
      setOrder(updated);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка');
    }
  };

  if (!order) return <p className="p-8 text-zinc-600">Загрузка...</p>;

  const next = ORDER_STATUS_NEXT[order.status] || [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link to="/admin/orders" className="text-sm text-zinc-600 hover:text-amber-600">
        К списку
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-zinc-900">{order.order_number}</h1>
      <p className={`mt-2 inline-block rounded px-2 py-1 text-sm ${statusBadgeClass(order.status)}`}>
        {ORDER_STATUS_LABELS[order.status]}
      </p>
      <p className="mt-4 text-zinc-800">{order.customer_name}</p>
      <p className="text-sm text-zinc-600">{order.delivery_address}</p>
      <ul className="mt-6 space-y-2 text-sm text-zinc-800">
        {order.items?.map((i) => (
          <li key={i.id}>
            {i.product_name_snapshot} × {i.quantity} — {i.line_total} ₽
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xl font-medium text-amber-700">Итого: {order.total_amount} ₽</p>
      <div className="mt-6 flex gap-2">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
        >
          <option value={order.status}>{ORDER_STATUS_LABELS[order.status]}</option>
          {next.map((s) => (
            <option key={s} value={s}>
              {ORDER_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        <button type="button" onClick={saveStatus} className="rounded-lg bg-amber-500 px-4 py-2 text-white hover:bg-amber-600">
          Сохранить статус
        </button>
      </div>
      {error && <p className="mt-2 text-red-600">{error}</p>}
    </div>
  );
}
