export function clearLocalStorageExcept(keysToKeep) {
  Object.keys(localStorage).forEach((key) => {
    if (!keysToKeep.includes(key)) {
      localStorage.removeItem(key);
    }
  });
}
