export type CourseType = {
    id: number,
    title: string;
    image: string;
    description: string;
    price: number;
    rating: number;
}

export type FilterType = {
    query: string;
    minPrice: string;
    maxPrice: string;
    rating: string;
}