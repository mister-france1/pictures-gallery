export interface IAxiosMeta<T> {
    data: T | null;
    error: Error | null;
    loaded: boolean;
}

export type AxiosPost<T> = [(url: string, payload?: any, signal?: any, headers?: any) => Promise<void>, IAxiosMeta<T>];
export type AxiosGet<T> = [(url: string) => Promise<void>, IAxiosMeta<T>];
