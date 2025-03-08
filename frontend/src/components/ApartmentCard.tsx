'use client'
import { Apartment } from "@/types";
import Image from "next/image";

interface ApartmentCardProps {
    data: Apartment
}

export default function ApartmentCard({
    data
}: ApartmentCardProps) {
    return (
        <div className=" relative rounded-2xl border bg-white shadow-lg overflow-hidden cursor-pointer">
            <div className="relative w-full h-50">
                <Image
                    loader={() => data.imageUrl}
                    src={data.imageUrl}
                    alt={data.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-2xl"
                />
            </div>
            <div className="p-4 text-center">
                <h2 className="text-xl font-bold">{data.title}</h2>
                <p className="text-gray-600">{data.location}</p>
                <p className="text-gray-800">${data.price} / month</p>
                <p className="text-gray-600">{data.type}</p>
                <p className="text-gray-600">{data.bedrooms} Bedrooms / {data.bathrooms} Bathrooms</p>
            </div>
        </div>
    );
}
