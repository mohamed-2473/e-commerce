import { Product } from "./product";

export interface Prod {
    total: number,
    skip: number,
    products: Product[],
    limit: number
}