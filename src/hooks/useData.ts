import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { AxiosRequestConfig, CanceledError } from "axios";

const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);

        apiClient
            .get(endpoint, { signal: controller.signal, ...requestConfig })
            .then((res) => {
                setLoading(false);
                if (res.data.photos) {
                    setData(res.data.photos)
                } else {
                    setData(res.data);
                }
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err.message)
                setLoading(false);
            });

        return () => controller.abort();
    }, deps ? [...deps] : []);

    return { data, error, isLoading }
}

export default useData