import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useAppSelector } from '../store/hooks';
import { adminApi } from '../store/adminApi';

export function A3_ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useAppSelector((s) => s.auth.token);
  const isNew = id === 'new';
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
  const [form, setForm] = useState({
    sku: '',
    name: '',
    category_id: '',
    description: '',
    price: 0,
    stock_qty: 0,
    is_published: true,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    adminApi.getCategories(token).then((r) => {
      setCategories(r.items);
      if (isNew && r.items[0]) setForm((f) => ({ ...f, category_id: r.items[0].id }));
    });
    if (!isNew && id) {
      adminApi.getProduct(token, id).then((p) =>
        setForm({
          sku: p.sku,
          name: p.name,
          category_id: p.category_id,
          description: p.description,
          price: p.price,
          stock_qty: p.stock_qty,
          is_published: p.is_published,
        }),
      );
    }
  }, [token, id, isNew]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    const body = { ...form, price: Number(form.price), stock_qty: Number(form.stock_qty) };
    try {
      if (isNew) await adminApi.createProduct(token, body);
      else if (id) await adminApi.updateProduct(token, id, body);
      navigate('/admin/products');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка');
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link to="/admin/products" className="text-sm text-zinc-600 hover:text-amber-600">
        Назад
      </Link>
      <h1 className="mt-4 text-2xl font-bold">{isNew ? 'Новый товар' : 'Редактирование'}</h1>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <input
          required
          placeholder="SKU"
          value={form.sku}
          onChange={(e) => setForm({ ...form, sku: e.target.value })}
          className="w-full rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
        />
        <input
          required
          placeholder="Название"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
        />
        <select
          value={form.category_id}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          className="w-full rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
        />
        <input
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          className="w-full rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
        />
        <input
          type="number"
          value={form.stock_qty}
          onChange={(e) => setForm({ ...form, stock_qty: Number(e.target.value) })}
          className="w-full rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
        />
        <label className="flex gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.is_published}
            onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
          />
          Опубликован
        </label>
        {error && <p className="text-red-400">{error}</p>}
        <button type="submit" className="rounded-lg bg-amber-500 px-4 py-2 text-zinc-950">
          Сохранить
        </button>
      </form>
    </div>
  );
}
