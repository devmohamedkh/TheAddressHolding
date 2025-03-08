import { ApartmentTypes } from "./ApartmentTypes"

export interface Apartment {
    id: string,
    imageUrl: string,
    type: ApartmentTypes,
    title: string,
    phone: string,
    location: string,
    description: string
    bedrooms: number,
    bathrooms: number
    isAvailable: boolean
    price: number
}