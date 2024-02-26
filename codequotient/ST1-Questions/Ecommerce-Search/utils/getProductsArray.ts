import { readFile } from "fs/promises";
import { PRODUCT } from "../types.js";

export const getFilteredProducts = async (category: string, price: number): Promise<PRODUCT[]> => {
    const path = new URL("../../products.json", import.meta.url);
    const fileData = await readFile(path, { encoding: 'utf8' });
    const allProducts = JSON.parse(fileData) as PRODUCT[];
    const filteredProducts = allProducts.filter((prod) => {
        return category.toLowerCase() === prod.category.toLowerCase() && prod.price >= price;
    })
    return filteredProducts;

}
export const getSpecifiedProducts = async (...categories: string[]): Promise<PRODUCT[]> => {
    const path = new URL("../../products.json", import.meta.url);
    const fileData = await readFile(path, { encoding: 'utf8' });
    const allProducts = JSON.parse(fileData) as PRODUCT[];
    const filteredProducts = allProducts.filter((prod) => {
        return categories.includes(prod.category.toLowerCase());
    })
    return filteredProducts;
}
