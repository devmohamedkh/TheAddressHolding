<<<<<<< HEAD
import ApartmentCard from "@/components/ApartmentCard";
import { Input } from "@/components/ui/input";
=======
>>>>>>> 184e96aebf1c85e17b2b5a8b77085321d037510a
import Image from "next/image";

export default function Home() {
  return (
<<<<<<< HEAD
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
=======
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
>>>>>>> 184e96aebf1c85e17b2b5a8b77085321d037510a
      </footer>
    </div>
  );
}
