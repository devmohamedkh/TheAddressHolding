export interface Apartment {
    id: string,
    imageUrl: string,
    type: string,
    title: string,
    phone: string,
    location: string,
    description: string
    bedrooms: number,
    bathrooms: number
    isAvailable: boolean
    price: number
}