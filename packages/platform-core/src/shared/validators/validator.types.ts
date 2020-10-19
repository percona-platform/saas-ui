export type VResult = string | undefined;

export type Validator<T = any> = (value: T, values?: Record<string, any>, meta?: any) => VResult;
