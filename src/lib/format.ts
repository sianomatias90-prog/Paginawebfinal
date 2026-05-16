export function formatPrice(price: number): string {
  const hasDecimals = !Number.isInteger(price);
  return price.toLocaleString('es-AR', {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: hasDecimals ? 2 : 0,
  });
}
