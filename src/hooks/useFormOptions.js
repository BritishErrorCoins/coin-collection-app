export function useFormOptions(dataset, formData) {
  const getFilteredOptions = (field, filterField, filterValue) => {
    const filtered = dataset.filter((item) => {
      return !filterValue || item[filterField] === filterValue;
    });
    return [...new Set(filtered.map((item) => item[field]).filter(Boolean))].sort();
  };

  return {
    denomination: [...new Set(dataset.map((c) => c.Denomination).filter(Boolean))].sort(),
    monarch: getFilteredOptions("Monarch", "Denomination", formData.Denomination),
    metal: getFilteredOptions("Metal", "Monarch", formData.Monarch),
    strikeType: getFilteredOptions("Strike Type", "Metal", formData.Metal),
    variety: getFilteredOptions("Variety", "Strike Type", formData["Strike Type"]),
  };
}