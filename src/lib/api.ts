export function formatPrice(price: number, currency = "AED"): string {
  if (price >= 1000000) {
    return `${currency} ${(price / 1000000).toFixed(2)}M`;
  }
  if (price >= 1000) {
    return `${currency} ${(price / 1000).toFixed(0)}K`;
  }
  return `${currency} ${price.toLocaleString()}`;
}

export function formatPriceFull(price: number, currency = "AED"): string {
  return `${currency} ${price.toLocaleString()}`;
}
