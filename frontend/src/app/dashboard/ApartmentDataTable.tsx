'use client'
import { DataTable } from "@/components/ui/data-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import axiosInstance from '@/lib/axios';
import { Apartment } from "@/types";
import LoaderWithErrorHandler from "@/components/LoaderWithErrorHandler";
import ApartmentForm from "./ApartmentForm";
import { Button } from "@/components/ui/button";

const ApartmentTable = () => {
    const [apartments, setApartments] = useState<Apartment[]>([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchApartments = async () => {
            setLoading(true)
            try {
                const response = await axiosInstance.get('/apartments');
                setApartments(response.data);
            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false)

            }
        };
        fetchApartments();
    }, []);

    return (
        <>

            <div className="flex justify-end mb-4">
                <Button
                    onClick={() => setIsModalOpen(true)}
                >
                    Create New Apartment
                </Button>
            </div>
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
                            <DropdownMenuTrigger asChild><MoreHorizontal /></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                                <DropdownMenuItem>{row.original.isAvailable ? 'Mark as Unavailable' : 'Mark as Available'}</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ),
                }
            ]} data={apartments} />

            <ApartmentForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />


            <LoaderWithErrorHandler loading={loading} alert={alert} />

        </>
    );
};
export default ApartmentTable;