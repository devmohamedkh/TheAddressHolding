import ApartmentCard from '@/components/ApartmentCard';
import React from 'react';

const ApartmentList: React.FC = () => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full ">

            {[...new Array(30)].map(() =>
            (

                <ApartmentCard data={{
                    id: '1',
                    title: "Luxury Apartment",
                    location: "Downtown",
                    price: 2000,
                    imageUrl: "https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure-1024x576.webp",
                    type: "Condo",
                    phone: "123-456-7890",
                    description: "A beautiful luxury apartment in downtown.",
                    bedrooms: 3,
                    bathrooms: 2,
                    isAvailable: true
                }} />
            )

            )}
        </div>
    );
};

export default ApartmentList;