export function getUniqueValues(data, key) {
  return [...new Set(data.map((item) => item[key]).filter(Boolean))].sort();
}

export function addToCollection(newCoin) {
  const coin = {
    id: Date.now(),
    denomination: newCoin.Denomination || newCoin.denomination,
    monarch: newCoin.Monarch || newCoin.monarch,
    metal: newCoin.Metal || newCoin.metal,
    strikeType: newCoin["Strike Type"] || newCoin.strikeType,
    variety: newCoin.Variety || newCoin.variety,
    year: newCoin.Year || newCoin.year,
    pricePaid: newCoin.purchasePrice || newCoin.pricePaid || "",
    notes: newCoin.notes || "",
  };
  const current = JSON.parse(localStorage.getItem("collection") || "[]");
  current.push(coin);
  localStorage.setItem("collection", JSON.stringify(current));
}

export function addToWantlist(newItem) {
  const current = JSON.parse(localStorage.getItem("wantlist") || "[]");
  current.push(newItem);
  localStorage.setItem("wantlist", JSON.stringify(current));
}
