'use client'

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import axiosInstance from '@/lib/axios';
import { useEffect, useState } from 'react';
import { Alert, Apartment } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from 'axios';
import { ApartmentTypes } from '@/types/ApartmentTypes';
import LoaderWithErrorHandler from '@/components/LoaderWithErrorHandler';


const ApartmentForm = ({ isOpen, onClose }: any) => {
    const [alert, setAlert] = useState<Alert | null>();
    const [loading, setLoading] = useState(false);
    const [apartmentTypes, setApartmentTypes] = useState<ApartmentTypes[] | null>([]);


    useEffect(() => {
        async function getApartmentTypes() {
            setLoading(true)
            try {
                const response = await axiosInstance.get('/apartment-types')
                setApartmentTypes(response.data);
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

        getApartmentTypes()

    }, [])


    const formik = useFormik<Omit<Apartment, 'id'>>({
        initialValues: {
            title: '',
            imageUrl: '',
            type: 0,
            phone: '',
            location: '',
            description: '',
            bedrooms: 0,
            bathrooms: 0,
            isAvailable: false,
            price: 0,
        },
        validationSchema: Yup.object({
            imageUrl: Yup.string().url().required(),
            type: Yup.string().required(),
            title: Yup.string().required(),
            phone: Yup.string().required(),
            location: Yup.string().required(),
            description: Yup.string().required(),
            bedrooms: Yup.number().min(1).required(),
            bathrooms: Yup.number().min(1).required(),
            isAvailable: Yup.boolean().required(),
            price: Yup.number().min(1).required()
        }),
        onSubmit: async (values) => {
            values.type = +values.type
            setLoading(true)
            await axiosInstance.post('/apartments', values)
            setLoading(false)
            setAlert({
                type: 'success',
                message: 'Your Apartment has been created successfully!'
            });
            onClose()
        },
    });
    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Apartment</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(['title', 'imageUrl', 'type', 'phone', 'location', 'price', 'description', 'bedrooms', 'bathrooms'] as const).map((field) => (
                                <div key={field} className={field === 'description' ? "col-span-2" : ""}>
                                    <Label htmlFor={field} className="mb-2">
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </Label>

                                    {field === 'description' ? (
                                        <Textarea
                                            id={field}
                                            {...formik.getFieldProps(field)}
                                            className={cn('w-full', formik.touched[field] && formik.errors[field] && 'border-red-500')}
                                        />
                                    ) : field === 'type' ? (
                                        <Select
                                            onValueChange={(value) => formik.setFieldValue(field, value)}
                                            value={String(formik.values.type)} // Ensure correct value handling
                                        >
                                            <SelectTrigger className={cn('w-full', formik.touched[field] && formik.errors[field] && 'border-red-500')}>
                                                <SelectValue placeholder="Select type">
                                                    {apartmentTypes?.find((item) => item.id === +formik.values.type)?.name || "Select type"}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {apartmentTypes?.map((item) => (
                                                    <SelectItem key={item.id} value={'' + item.id}>{item.name}</SelectItem> // Ensure `value` is `item.id`
                                                ))}
                                            </SelectContent>
                                        </Select>

                                    ) : (
                                        <Input
                                            id={field}
                                            type={['bedrooms', 'bathrooms', 'price'].includes(field) ? "number" : "text"}
                                            {...formik.getFieldProps(field)}
                                            className={cn(formik.touched[field] && formik.errors[field] && 'border-red-500')}
                                        />
                                    )}

                                    {formik.touched[field] && formik.errors[field] && (
                                        <p className="text-red-500 text-sm">{formik.errors[field]}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="w-full my-4 cursor-pointer" disabled={formik.isSubmitting}>
                                Create Apartment
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <LoaderWithErrorHandler loading={loading} alert={alert} />

        </>

    );
};
export default ApartmentForm;