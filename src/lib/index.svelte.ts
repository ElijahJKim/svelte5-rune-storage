class CreatePersistedState<T> {
  #key: string;
  #initialValue: T;
  #internalValue = $state<T>() as T;

  #cleanupRoot?: () => void;

  constructor(key: string, initialValue: T) {
    this.#key = key;
    this.#initialValue = initialValue;

    if (typeof window !== "undefined") {
      const item = localStorage.getItem(key);
      try {
        this.#internalValue = item ? JSON.parse(item) : initialValue;
      } catch {
        this.#internalValue = initialValue;
      }

      this.#cleanupRoot = $effect.root(() => {
        $effect(() => {
          const sync = (e: StorageEvent) => {
            if (e.key === this.#key && e.newValue) {
              try {
                this.#internalValue = JSON.parse(e.newValue);
              } catch (err) {
                console.error("Sync parsing failed", err);
              }
            }
          };

          window.addEventListener("storage", sync);
          return () => window.removeEventListener("storage", sync);
        });
      });
    } else {
      this.#internalValue = initialValue;
    }
  }

  get value() {
    return this.#internalValue;
  }

  set value(newValue: T) {
    this.#internalValue = newValue;
    if (typeof window !== "undefined") {
      localStorage.setItem(this.#key, JSON.stringify(newValue));
    }
  }

  destroy() {
    if (this.#cleanupRoot) {
      this.#cleanupRoot();
    }
  }
}

export function persistedState<T>(key: string, initialValue: T) {
  return new CreatePersistedState(key, initialValue);
}
