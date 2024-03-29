import { useState, useCallback } from 'react';
import axios from 'axios';
import { AxiosPost } from '../models/axios';

export const useAxiosPost = <T> (): AxiosPost<T> => {
    const [data, setData] = useState<null | T>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false);

    const postRequest = useCallback(async (url: string, payload?: any, signal?: any, headers?: any): Promise<void> => {
        try {
            const response = await axios.post(
                url,
                payload,
                {
                    signal,
                    headers
                }
            );

            setData(response.data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoaded(true);
        }
    }, [
        setData,
        setError,
        setLoaded
    ]);

    return [postRequest, {data, error, loaded}];
};
