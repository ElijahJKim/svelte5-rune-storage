export declare class PersistedState<T> {
    #private;
    value: T;
    constructor(key: string, initialValue: T);
    reset(): void;
}
