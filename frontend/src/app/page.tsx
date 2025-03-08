import ApartmentCard from "@/components/ApartmentCard";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" w-full p-4 md:p-10">
      <header className="relative w-full h-64 md:h-96 bg-gray-800 rounded-2xl overflow-hidden mb-10">
        <Image
          src="/headerBg.webp"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-3">
          <h1 className="text-3xl md:text-5xl font-bold">Find Your Dream Apartment</h1>
          <div className="mt-4">
            <Input
              type="text"
              placeholder="Search for apartments..."
              className="px-4 py-5 w-50 md:w-96 rounded-md text-black bg-white"
            />
          </div>
        </div>
      </header>
      <main >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full">

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
      </main>
      <footer className="w-full flex flex-wrap items-center justify-center p-4 bg-gray-800 text-white mt-30">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}
