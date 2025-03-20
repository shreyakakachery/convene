export function clearLocalStorageExcept(keysToKeep) {
  // Loop through all items in localStorage
  Object.keys(localStorage).forEach((key) => {
    // Check if the key is not in the list of keys to keep
    if (!keysToKeep.includes(key)) {
      localStorage.removeItem(key);
    }
  });
}

export { clearLocalStorageExcept };
