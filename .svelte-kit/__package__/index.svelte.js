class CreatePersistedState {
    #key;
    #initialValue;
    #internalValue = $state();
    #cleanupRoot;
    constructor(key, initialValue) {
        this.#key = key;
        this.#initialValue = initialValue;
        if (typeof window !== "undefined") {
            const item = localStorage.getItem(key);
            try {
                this.#internalValue = item ? JSON.parse(item) : initialValue;
            }
            catch {
                this.#internalValue = initialValue;
            }
            this.#cleanupRoot = $effect.root(() => {
                $effect(() => {
                    const sync = (e) => {
                        if (e.key === this.#key && e.newValue) {
                            try {
                                this.#internalValue = JSON.parse(e.newValue);
                            }
                            catch (err) {
                                console.error("Sync parsing failed", err);
                            }
                        }
                    };
                    window.addEventListener("storage", sync);
                    return () => window.removeEventListener("storage", sync);
                });
            });
        }
        else {
            this.#internalValue = initialValue;
        }
    }
    get value() {
        return this.#internalValue;
    }
    set value(newValue) {
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
export function persistedState(key, initialValue) {
    return new CreatePersistedState(key, initialValue);
}
