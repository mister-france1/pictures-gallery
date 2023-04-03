import { GenericAbortSignal } from 'axios/index';

export interface IAxiosMeta<T> {
    data: T | null;
    error: string | null;
    loaded: boolean;
}

export type Headers = { [key: string]: string } | undefined;

export type AxiosPost<T> = [(url: string, payload?: unknown, signal?: GenericAbortSignal | undefined,
                             headers?: Headers) => Promise<void>, IAxiosMeta<T>];
export type AxiosGet<T> = [(url: string) => Promise<void>, IAxiosMeta<T>];
