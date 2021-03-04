import { useEffect, useRef } from "react";
import { AUTO_REFRESH_INTERVAL } from "../config";

export function useAutoRefresh(callback) {
    const intervalRef = useRef();

    useEffect(() => {
        intervalRef.current = setInterval(() => callback(), AUTO_REFRESH_INTERVAL);
        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);
}
