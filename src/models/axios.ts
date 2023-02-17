export interface IAxiosMeta {
    data: Response | null;
    error: Error | null;
    loaded: boolean;
}

export type AxiosPost = [(url: string, payload?: any, signal?: any) => Promise<void>, IAxiosMeta];
