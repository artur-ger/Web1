import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../store/cart';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function P2_Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCart((state) => state.addItem);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="text-zinc-500">Товар не найден</p>
        <Link to="/" className="mt-4 inline-block text-amber-400 hover:text-amber-300">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(
      {
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        price: product.price,
      },
      quantity
    );
  };

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-amber-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Назад к каталогу
      </Link>

      <div className="grid grid-cols-2 gap-12">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="aspect-square overflow-hidden rounded-lg bg-zinc-900/50">
            <ImageWithFallback
              src={product.images[selectedImage]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square w-20 overflow-hidden rounded border-2 transition-colors ${
                    selectedImage === index
                      ? 'border-amber-500'
                      : 'border-zinc-800 hover:border-zinc-600'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} - вид ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            <p className="text-sm text-zinc-500">Артикул: {product.sku}</p>
          </div>

          <p className="text-4xl font-bold text-amber-400">
            {product.price.toLocaleString('ru-RU')} ₽
          </p>

          <p className="leading-relaxed text-zinc-300">{product.description}</p>

          <div className="space-y-2 rounded-lg border border-zinc-800 bg-zinc-900/30 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Наличие на складе:</span>
              <span
                className={
                  product.stock > 50
                    ? 'font-medium text-green-400'
                    : product.stock > 0
                      ? 'font-medium text-amber-400'
                      : 'font-medium text-red-400'
                }
              >
                {product.stock > 0 ? `${product.stock} шт.` : 'Нет в наличии'}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-400">Количество:</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-100 disabled:opacity-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-100 disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <motion.button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3 font-medium text-zinc-950 transition-colors hover:bg-amber-400 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingCart className="h-5 w-5" />
                В корзину
              </motion.button>

              <motion.button
                onClick={() => {
                  handleAddToCart();
                  navigate('/cart');
                }}
                disabled={product.stock === 0}
                className="rounded-lg border border-amber-500 px-6 py-3 font-medium text-amber-400 transition-colors hover:bg-amber-500/10 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Перейти в корзину
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
