import { useState, useCallback } from 'react';
import axios from 'axios';
import { AxiosGet } from '../models/axios';

export const useAxiosGet = <T> (): AxiosGet<T> => {
    const [data, setData] = useState<null | T>(null);
    const [error, setError] = useState<string | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false);

    const getRequest = useCallback(async (url: string): Promise<void> => {
        try {
            const response = await axios.get(url);

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

    return [getRequest, { data, error, loaded }];
};
