'use client'
import ApartmentCard from '@/components/ApartmentCard';
import LoaderWithErrorHandler from '@/components/LoaderWithErrorHandler';
import axiosInstance from '@/lib/axios';
import { Alert, Apartment } from '@/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ApartmentList: React.FC = () => {
    const [apartments, setApartments] = useState<Apartment[]>([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<Alert | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const fetchApartments = async () => {
        setLoading(true)
        try {
            setLoading(true)
            const response = await axiosInstance.get('/apartments');
            setApartments(response.data);
        } catch (error) {
            setAlert({
                type: 'error',
                message: axios.isAxiosError(error) ?
                    error.response?.data?.message ||
                    'Ops something was wrong please try again later' :
                    'Ops something was wrong please try again later'
            });

        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchApartments();
    }, []);



    return (
        <>

            {apartments?.map((apartment) =>
            (

                <ApartmentCard data={apartment} />
            )

            )}
            <LoaderWithErrorHandler loading={loading} alert={alert} />

        </>
    );
};

export default ApartmentList;