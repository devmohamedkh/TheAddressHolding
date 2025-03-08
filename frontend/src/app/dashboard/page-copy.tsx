'use client';

import { useFormik } from 'formik';
import LoaderWithErrorHandler from '../../components/LoaderWithErrorHandler';
import * as Yup from 'yup';
import { PagesURL } from '../../lib/pageURLs';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useRouter } from "next/navigation";
import axiosInstance from '@/lib/axios';
import { Alert, Apartment } from '@/types';
import axios from 'axios';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { DataTable } from '../../components/ui/data-table';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"




const Dashboard: React.FC = () => {

    const [apartments, setApartments] = useState<Apartment[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchApartments = async () => {
            try {
                const response = await axiosInstance.get('/apartments');
                setApartments(response.data);
            } catch (error) {
                console.error('Error fetching apartments:', error);
            }
        };

        fetchApartments();
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);



    const [alert, setAlert] = useState<Alert | null>();
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const formik = useFormik<Apartment>({
        initialValues: {
            title: '',
            imageUrl: '',
            type: '',
            phone: '',
            location: '',
            description: '',
            bedrooms: 0,
            bathrooms: 0,
            isAvailable: false,
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
        }),
        onSubmit: async (values) => {
            try {
                setLoading(true);
                await axiosInstance.post('/users', values);
                setLoading(false);
                setAlert({
                    type: 'success',
                    message: 'Your account has been created successfully! Redirecting to login page...',
                });
                setTimeout(() => {
                    router.push(PagesURL.login);
                }, 1000);
            } catch (error) {
                setAlert({
                    type: 'error',
                    message: axios.isAxiosError(error)
                        ? error.response?.data?.message || 'Ops something was wrong please try again later'
                        : 'Ops something was wrong please try again later',
                });
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className="h-screen w-full mt-10 md:mt-3 p-3 md:p-10">

            <div className="flex w-full  items-center justify-between mb-4">
                <h2 className="text-2xl font-bold ">Dashboard</h2>
                <div className="flex justify-end">
                    <Button onClick={openModal} className="flex items-center">
                        Create New Apartment
                    </Button>
                </div>
            </div>

            <div className="">

                {/* 
                cell: ({ value }: { value: string }) => <Image src={value} alt="Apartment" width={50} height={50} />
                                 { header: 'Available', accessorKey: 'isAvailable', Cell: ({ value }: { value: boolean }) => (value ? 'Yes' : 'No') },

             */}
                <DataTable columns={[
                    {
                        header: 'Image', accessorKey: 'imageUrl', cell: ({ row }: any) => {
                            const img = row.getValue("imageUrl")
                            return <Image loader={() => img} src={img} alt="Apartment" width={50} height={50} />
                        }
                    },
                    { header: 'Type', accessorKey: 'type' },
                    { header: 'Title', accessorKey: 'title' },
                    { header: 'Phone', accessorKey: 'phone' },
                    { header: 'Location', accessorKey: 'location' },
                    { header: 'Description', accessorKey: 'description' },
                    { header: 'Bedrooms', accessorKey: 'bedrooms' },
                    { header: 'Bathrooms', accessorKey: 'bathrooms' },
                    { header: 'Available', accessorKey: 'isAvailable', cell: ({ row }: any) => (row.getValue("isAvailable") ? 'Yes' : 'No') },
                    {
                        header: 'Actions',
                        accessorKey: 'actions',
                        cell: ({ row }: any) => (
                            <DropdownMenu>
                                {/*  handleDelete(row.original)   */}
                                <DropdownMenuTrigger asChild><MoreHorizontal /></DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                    <DropdownMenuItem>
                                        {row.original.isAvailable ? 'Mark as Unavailable' : 'Mark as Available'}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ),
                    }
                ]} data={
                    [
                        {
                            imageUrl: 'https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure-1024x576.webp',
                            type: 'Apartment',
                            title: 'Beautiful Apartment',
                            phone: '123-456-7890',
                            location: 'New York',
                            description: 'A beautiful apartment in New York.',
                            bedrooms: 2,
                            bathrooms: 1,
                            isAvailable: true,
                        },
                        {
                            imageUrl: 'https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure-1024x576.webp',
                            type: 'Condo',
                            title: 'Luxury Condo',
                            phone: '987-654-3210',
                            location: 'Los Angeles',
                            description: 'A luxury condo in Los Angeles.',
                            bedrooms: 3,
                            bathrooms: 2,
                            isAvailable: false,
                        },
                    ]}
                />

                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Apartment</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={formik.handleSubmit}>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div>
                                    <Label htmlFor="title" className='mb-2'>Title</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        {...formik.getFieldProps('title')}
                                        className={cn(formik.touched.title && formik.errors.title && 'border-red-500')}
                                    />
                                    {formik.touched.title && formik.errors.title && (
                                        <p className="text-red-500 text-sm">{formik.errors.title}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="imageUrl" className='mb-2'>Image URL</Label>
                                    <Input
                                        id="imageUrl"
                                        type="text"
                                        {...formik.getFieldProps('imageUrl')}
                                        className={cn(formik.touched.imageUrl && formik.errors.imageUrl && 'border-red-500')}
                                    />
                                    {formik.touched.imageUrl && formik.errors.imageUrl && (
                                        <p className="text-red-500 text-sm">{formik.errors.imageUrl}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="type" className='mb-2'>Type</Label>
                                    <Input
                                        id="type"
                                        type="text"
                                        {...formik.getFieldProps('type')}
                                        className={cn(formik.touched.type && formik.errors.type && 'border-red-500')}
                                    />
                                    {formik.touched.type && formik.errors.type && (
                                        <p className="text-red-500 text-sm">{formik.errors.type}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="phone" className='mb-2'>Phone</Label>
                                    <Input
                                        id="phone"
                                        type="text"
                                        {...formik.getFieldProps('phone')}
                                        className={cn(formik.touched.phone && formik.errors.phone && 'border-red-500')}
                                    />
                                    {formik.touched.phone && formik.errors.phone && (
                                        <p className="text-red-500 text-sm">{formik.errors.phone}</p>
                                    )}
                                </div>

                                <div className="col-span-2">
                                    <Label htmlFor="location" className='mb-2'>Location</Label>
                                    <Input
                                        id="location"
                                        type="text"
                                        {...formik.getFieldProps('location')}
                                        className={cn(formik.touched.location && formik.errors.location && 'border-red-500')}
                                    />
                                    {formik.touched.location && formik.errors.location && (
                                        <p className="text-red-500 text-sm">{formik.errors.location}</p>
                                    )}
                                </div>

                                <div className="col-span-2">
                                    <Label htmlFor="description" className='mb-2'>Description</Label>
                                    <Textarea
                                        id="description"
                                        {...formik.getFieldProps('description')}
                                        className={cn('w-full', formik.touched.description && formik.errors.description && 'border-red-500')}
                                    />
                                    {formik.touched.description && formik.errors.description && (
                                        <p className="text-red-500 text-sm">{formik.errors.description}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="bedrooms" className='mb-2'>Bedrooms</Label>
                                    <Input
                                        id="bedrooms"
                                        type="number"
                                        {...formik.getFieldProps('bedrooms')}
                                        className={cn(formik.touched.bedrooms && formik.errors.bedrooms && 'border-red-500')}
                                    />
                                    {formik.touched.bedrooms && formik.errors.bedrooms && (
                                        <p className="text-red-500 text-sm">{formik.errors.bedrooms}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="bathrooms" className='mb-2'>Bathrooms</Label>
                                    <Input
                                        id="bathrooms"
                                        type="number"
                                        {...formik.getFieldProps('bathrooms')}
                                        className={cn(formik.touched.bathrooms && formik.errors.bathrooms && 'border-red-500')}
                                    />
                                    {formik.touched.bathrooms && formik.errors.bathrooms && (
                                        <p className="text-red-500 text-sm">{formik.errors.bathrooms}</p>
                                    )}
                                </div>

                                <div >
                                    <div className="flex items-center w-full space-x-4">
                                        <Label htmlFor="isAvailable" className='mb-2 w-max'>Is Available</Label>
                                        <Input
                                            id="isAvailable"
                                            type="checkbox"
                                            {...formik.getFieldProps('isAvailable')}
                                            className={cn(formik.touched.isAvailable && formik.errors.isAvailable && 'border-red-500') + ' w-5 h-5'}
                                        />
                                    </div>
                                    {formik.touched.isAvailable && formik.errors.isAvailable && (
                                        <p className="text-red-500 text-sm">{formik.errors.isAvailable}</p>
                                    )}
                                </div>

                            </div>
                            <DialogFooter>

                                <Button type="submit" className="w-full my-4 cursor-pointer" disabled={formik.isSubmitting}>
                                    Create Apartment
                                </Button>
                            </DialogFooter>
                        </form>

                    </DialogContent>
                </Dialog>

            </div>
            <LoaderWithErrorHandler loading={loading} alert={alert} />
        </div >
    );
};

export default Dashboard;
