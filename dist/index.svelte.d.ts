declare class CreatePersistedState<T> {
    #private;
    constructor(key: string, initialValue: T);
    get value(): T;
    set value(newValue: T);
    destroy(): void;
}
export declare function persistedState<T>(key: string, initialValue: T): CreatePersistedState<T>;
export {};
