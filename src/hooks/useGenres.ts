import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Genre{
    id: number;
    name: string;
    slug: string;
}

interface fetchGenreResponse{
    count: number;
    results: Genre[];
}

const useGenres = () => {

    const controller = new AbortController()

    const [genres, setGenres] = useState<Genre[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        apiClient.get<fetchGenreResponse>('/genres', {signal:controller.signal})
        .then(res=>{
            setGenres(res.data.results);
            setLoading(false)
        })
        .catch(err=>{
            setLoading(false);
            if (err instanceof CanceledError) return;
            setError(err.message)})

        return () => controller.abort()
    })

    return {genres, error, isLoading};
}

export default useGenres;