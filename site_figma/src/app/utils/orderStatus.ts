export const ORDER_STATUS_LABELS: Record<string, string> = {
  new: 'Новый',
  confirmed: 'Подтверждён',
  paid: 'Оплачен',
  shipped: 'Отправлен',
  completed: 'Завершён',
  cancelled: 'Отменён',
};

export const ORDER_STATUS_NEXT: Record<string, string[]> = {
  new: ['confirmed', 'cancelled'],
  confirmed: ['paid', 'cancelled'],
  paid: ['shipped', 'cancelled'],
  shipped: ['completed'],
  completed: [],
  cancelled: [],
};

export function statusBadgeClass(status: string): string {
  switch (status) {
    case 'new':
      return 'bg-blue-500/10 text-blue-400';
    case 'confirmed':
    case 'paid':
      return 'bg-amber-500/10 text-amber-400';
    case 'shipped':
      return 'bg-purple-500/10 text-purple-400';
    case 'completed':
      return 'bg-green-500/10 text-green-400';
    case 'cancelled':
      return 'bg-red-500/10 text-red-400';
    default:
      return 'bg-zinc-800 text-zinc-400';
  }
}
