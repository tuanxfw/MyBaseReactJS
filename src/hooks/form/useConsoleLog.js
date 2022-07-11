import { useEffect } from "react";

export default function useConsoleLog(watch) {
    useEffect(() => {
        const subscription = watch(async (value, { name, type }) => {
            console.logDev({value, name, type});
        });
        return () => subscription?.unsubscribe ? subscription.unsubscribe() : null;
    }, [watch])
}