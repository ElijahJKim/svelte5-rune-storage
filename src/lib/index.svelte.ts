export class PersistedState<T> {
  #key: string;
  #initialValue: T;

  // this value is reactive and can be modified ($state)
  value = $state<T>() as T;

  constructor(key: string, initialValue: T) {
    this.#key = key;
    this.#initialValue = initialValue;

    // SSR protection and initial value setting (only access local storage on browser)
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(key);
      if (item !== null) {
        // protect broken data (try-catch)
        try {
          this.value = JSON.parse(item);
        } catch (err) {
          console.warn(
            `[rune-storage] '${key}' parsing failed. restoring initial value.`,
          );
          this.value = initialValue;
        }
      } else {
        this.value = initialValue;
      }
    } else {
      this.value = initialValue;
    }

    $effect(() => {
      // protect overflow error (try-catch)
      try {
        localStorage.setItem(this.#key, JSON.stringify(this.value));
      } catch (err) {
        console.error(
          `[rune-storage] '${this.#key}' saving failed (overflow error, etc.)`,
          err,
        );
      }
    });

    // synchronize the value between tabs
    $effect(() => {
      const sync = (e: StorageEvent) => {
        if (e.key === this.#key && e.newValue) {
          this.value = JSON.parse(e.newValue);
        }
      };
      window.addEventListener("storage", sync);
      return () => window.removeEventListener("storage", sync);
    });
  }

  reset() {
    this.value = this.#initialValue; // reset the value on the screen
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.#key); // remove the value from the storage
    }
  }
}
