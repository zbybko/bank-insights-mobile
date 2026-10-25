// Format the decimal string without converting money to a floating point number.
export function formatMoney(amount: string, currency: string): string {
  const negative = amount.startsWith('-');
  const [whole, fraction = ''] = amount.replace(/^-/, '').split('.');
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const symbol = ({ EUR: '€', USD: '$', GBP: '£' } as Record<string, string>)[currency];
  const number = `${grouped}.${fraction.padEnd(2, '0')}`;
  return `${negative ? '−' : ''}${symbol ?? `${currency} `}${number}`;
}

export function currentMonth(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function shiftMonth(month: string, offset: number): string {
  const [year, index] = month.split('-').map(Number);
  return currentMonth(new Date(year, index - 1 + offset, 1));
}

export function monthLabel(month: string): string {
  const [year, index] = month.split('-').map(Number);
  return new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' })
    .format(new Date(year, index - 1, 1));
}

export function dateLabel(date: string): string {
  const [year, month, day] = date.slice(0, 10).split('-').map(Number);
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' })
    .format(new Date(year, month - 1, day));
}
