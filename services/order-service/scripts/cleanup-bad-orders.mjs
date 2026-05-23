import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dataDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'data');

function isCorruptedOrder(order) {
  const name = order.customer_name || '';
  const addr = order.delivery_address || '';
  if (/\?{1,}/.test(name) || /\?{1,}/.test(addr)) return true;
  if (/[\uFFFD]/.test(name) || /[\uFFFD]/.test(addr)) return true;
  if (/Р[Ѓ-Я]{1,2}Р/.test(name) || /Р[Ѓ-Я]{1,2}Р/.test(addr)) return true;
  if (/РЎРІРµ|РЅРѕРІ|РњРѕСЃ|РџСЂРёРј/.test(name + addr)) return true;
  return false;
}

function cleanDb(filename, filterFn) {
  const filePath = path.join(dataDir, filename);
  const lines = fs.readFileSync(filePath, 'utf8').split('\n').filter(Boolean);
  const kept = [];
  let removed = 0;

  for (const line of lines) {
    const row = JSON.parse(line);
    if (row.$$indexCreated) {
      kept.push(line);
      continue;
    }
    if (filterFn(row)) {
      removed += 1;
    } else {
      kept.push(line);
    }
  }

  fs.writeFileSync(filePath, kept.length ? `${kept.join('\n')}\n` : '', 'utf8');
  return removed;
}

const orderLines = fs
  .readFileSync(path.join(dataDir, 'orders.db'), 'utf8')
  .split('\n')
  .filter(Boolean);
const removeOrderIds = new Set();

for (const line of orderLines) {
  const row = JSON.parse(line);
  if (row.$$indexCreated) continue;
  if (isCorruptedOrder(row)) removeOrderIds.add(row.id);
}

const removedOrders = cleanDb('orders.db', (row) => removeOrderIds.has(row.id));
const removedItems = cleanDb('order-items.db', (row) => removeOrderIds.has(row.order_id));

console.log('Removed orders:', removedOrders);
console.log('Removed order items:', removedItems);
console.log('Order IDs:', [...removeOrderIds].join(', ') || '(none)');
