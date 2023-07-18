import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface fetchResponse<T>{
    count: number;
    results: T[];
}

const useData = <T>(endpoint: string) => {

    const controller = new AbortController()

    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        apiClient.get<fetchResponse<T>>(endpoint, {signal:controller.signal})
        .then(res=>{
            setData(res.data.results);
            setLoading(false)
        })
        .catch(err=>{
            setLoading(false);
            if (err instanceof CanceledError) return;
            setError(err.message)})

        return () => controller.abort()
    },[])

    return {data, error, isLoading};
}

export default useData;