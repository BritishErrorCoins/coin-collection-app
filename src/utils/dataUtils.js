export function getUniqueValues(data, key) {
  return [...new Set(data.map((item) => item[key]).filter(Boolean))].sort();
}
export function addToCollection(newCoin) {
  const current = JSON.parse(localStorage.getItem("collection") || "[]");
  current.push(newCoin);
  localStorage.setItem("collection", JSON.stringify(current));
}

export function addToWantlist(newItem) {
  const current = JSON.parse(localStorage.getItem("wantlist") || "[]");
  current.push(newItem);
  localStorage.setItem("wantlist", JSON.stringify(current));
}
