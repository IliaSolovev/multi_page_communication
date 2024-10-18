export class LocalStorage {
  private prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix; // Prefix to apply to all keys
  }

  // Add prefix to the key
  _getKey(key: string) {
    return `${this.prefix}_${key}`;
  }

  // Method to set an item in localStorage with prefix
  set<V>(key: string, value: V) {
    const prefixedKey = this._getKey(key);
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }

  // Method to get an item from localStorage with prefix
  get(key: string) {
    const prefixedKey = this._getKey(key);
    const value = localStorage.getItem(prefixedKey);
    return value ? JSON.parse(value) : null;
  }
  // Method to listen for changes to a specific key (with prefix) in localStorage
  listen<V>(key: string, callback: (value: V) => void) {
    const prefixedKey = this._getKey(key);
    const listener = (event: StorageEvent) => {
      if (event.key === prefixedKey) {
        const newValue = event.newValue ? JSON.parse(event.newValue) : null;
        callback(newValue);
      }
    };
    // Listen to the 'storage' event
    window.addEventListener("storage", listener);

    return () => {
      window.removeEventListener("storage", listener);
    };
  }

  unsubscribe<V>() {}
}
