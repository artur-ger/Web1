import { productIcons } from '../data/productIcons';

type IconKey = keyof typeof productIcons;

/** SKU из catalog-service (сиды) → те же картинки, что были в mock-каталоге */
const SKU_TO_ICON: Record<string, IconKey> = {
  'INC-A50-60-E27': 'incandescent',
  'INC-A60-75-E27': 'incandescent',
  'INC-CANDLE-40-E14': 'incandescent',
  'LED-A60-10W-3000': 'led1',
  'LED-A60-10W-4000': 'led2',
  'LED-A60-12W-6500': 'led3',
  'LED-C37-6W-3000': 'led4',
  'LED-G45-8W-4000': 'led5',
  'LED-R63-10W-4000': 'led6',
  'LED-PAR16-7W-GU10': 'led7',
  'LED-T8-18W-4000': 'led8',
  'FL-T8-18W-4000': 'fluorescent',
  'FL-COMP-15W-E27': 'fluorescent2',
  'LED-FIL-A60-8W-2700': 'panel',
  'LED-FIL-G95-12W-2700': 'pendant',
  'LED-GROW-12W-E27': 'smart',
  'INC-BALL-40W-E14': 'incandescent',
  'LED-MR16-5W-4000': 'strip',
  'LED-GX53-10W-4000': 'desk',
  'ACC-SOCKET-E27': 'accessory1',
};

const ICON_KEYS = Object.keys(productIcons) as IconKey[];

function iconDataUrlForSku(sku: string): string {
  const key = SKU_TO_ICON[sku];
  if (key) return productIcons[key];
  let h = 0;
  for (let i = 0; i < sku.length; i += 1) {
    h = (h + sku.charCodeAt(i)) % ICON_KEYS.length;
  }
  return productIcons[ICON_KEYS[h]];
}

function iconDataUrlForId(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i += 1) {
    h = (h + id.charCodeAt(i)) % ICON_KEYS.length;
  }
  return productIcons[ICON_KEYS[h]];
}

/** Картинка для карточки из API: всегда используем ваши сгенерированные SVG из productIcons */
export function resolveProductImageUrl(product: { id: string; sku: string; image_url?: string }): string {
  return iconDataUrlForSku(product.sku);
}

/**
 * В корзине нет SKU — передавайте sku из каталога по product_id, если уже загружен.
 * Иначе берём стабильную картинку по id.
 */
export function resolveCartLineImage(
  productId: string,
  _snapshotUrl: string,
  sku?: string | null,
): string {
  if (sku) return iconDataUrlForSku(sku);
  return iconDataUrlForId(productId);
}
