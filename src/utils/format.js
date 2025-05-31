
// format.js
export function formatPrice(value) {
  const price = parseFloat(value);
  if (isNaN(price)) return "£0.00";
  return "£" + price.toFixed(2);
}
