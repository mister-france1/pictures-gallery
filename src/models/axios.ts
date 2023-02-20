export interface IAxiosMeta {
    data: Response | null;
    error: Error | null;
    loaded: boolean;
}

export type AxiosPost = [(url: string, payload?: any, signal?: any, headers?: any) => Promise<void>, IAxiosMeta];
export type AxiosGet = [(url: string) => Promise<void>, IAxiosMeta];
