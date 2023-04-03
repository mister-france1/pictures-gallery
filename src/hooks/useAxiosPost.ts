import { useState, useCallback } from 'react';
import axios, { GenericAbortSignal } from 'axios';
import { AxiosPost, Headers } from '../models/axios';

export const useAxiosPost = <T>(): AxiosPost<T> => {
    const [data, setData] = useState<null | T>(null);
    const [error, setError] = useState<string | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false);

    const postRequest = useCallback(async (url: string, payload?: unknown, signal?: GenericAbortSignal | undefined,
        headers?: Headers): Promise<void> => {

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
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.message);
            } else {
                setError('An unexpected error occurred');
            }
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
