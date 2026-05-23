import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, Plus, Edit, EyeOff, Eye } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { resolveProductImageUrl } from '../utils/productImage';
import { useAppSelector } from '../store/hooks';
import { adminApi } from '../store/adminApi';
import type { Product } from '../store/types';

export function A2_Products() {
  const navigate = useNavigate();
  const token = useAppSelector((s) => s.auth.token);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await adminApi.getProducts(token, search || undefined);
      setProducts(data.items);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [token, search]);

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Товары</h1>
        <button
          type="button"
          onClick={() => navigate('/admin/products/new')}
          className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-zinc-950"
        >
          <Plus className="h-4 w-4" />
          Создать
        </button>
      </div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Поиск"
        className="mb-6 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-500"
      />
      {loading && <p className="text-zinc-600">Загрузка...</p>}
      {error && <p className="text-red-400">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
            <ImageWithFallback
              src={resolveProductImageUrl(p)}
              alt={p.name}
              className="aspect-square w-full rounded-lg object-cover"
            />
            <h3 className="mt-2 text-sm font-medium">{p.name}</h3>
            <p className="text-amber-400">{p.price} ₽</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <button type="button" onClick={() => navigate(`/admin/products/${p.id}`)}>
                <Edit className="inline h-3 w-3" /> Изменить
              </button>
              <button
                type="button"
                onClick={async () => {
                  await adminApi.setProductPublished(token!, p.id, !p.is_published);
                  load();
                }}
              >
                {p.is_published ? <EyeOff className="inline h-3 w-3" /> : <Eye className="inline h-3 w-3" />}
              </button>
              <button
                type="button"
                className="text-red-400"
                onClick={async () => {
                  if (confirm('Удалить?')) {
                    await adminApi.deleteProduct(token!, p.id);
                    load();
                  }
                }}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
