export interface Apparel {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    size: string;
    material: string;
    brand: string;
    price: number;
    stock: number;
    categoryId: number;
    category: {
        id: number;
        name: string;
    };
}