'use client';

import { Toaster, toast } from "sonner";
import {
    GridLoader

} from "react-spinners";
import { useEffect, CSSProperties } from 'react';
import { Alert } from "@/types";

interface LoaderProps {
    loading: boolean;
    alert?: Alert | null
}


const LoaderWithErrorHandler: React.FC<LoaderProps> = ({ loading, alert }) => {

    useEffect(() => {
        if (alert) {
            if (alert.type === 'error') {
                toast.error(alert.message)
            } else {
                toast.success(alert.message)
            }
        }
    }, [alert])


    return (
        <>
            <Toaster richColors closeButton />
            {loading && (
                <div style={styles.root} >
                    <GridLoader size={10} color=" #42a5f5" />
                </div>
            )}
        </>
    );
};


const styles: { root: CSSProperties } = {
    root: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    }
}

export default LoaderWithErrorHandler;
