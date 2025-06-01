export function getLocalData(key, fallback = []) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (e) {
    console.error(\`Failed to get local data for key "\${key}":\`, e);
    return fallback;
  }
}

export function setLocalData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(\`Failed to set local data for key "\${key}":\`, e);
  }
}
