export const customStorage: Storage = {
  length: 0,
  clear: function (): void {
    try {
      window.localStorage.clear();
      this.length = window.localStorage.length;
    } catch {
      return null;
    }
  },
  getItem: function (key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  key: function (index: number): string | null {
    try {
      return window.localStorage.key(index);
    } catch {
      return null;
    }
  },
  removeItem: function (key: string): void {
    try {
      window.localStorage.removeItem(key);
      this.length = window.localStorage.length;
    } catch {
      return;
    }
  },
  setItem: function (key: string, data: string): void {
    try {
      window.localStorage.setItem(key, data);
      this.length = window.localStorage.length;
    } catch {
      return;
    }
  }
};
