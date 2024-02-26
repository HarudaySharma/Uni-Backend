import express, { Application, Request, Response } from 'express'
import { getFilteredProducts, getSpecifiedProducts } from './utils/getProductsArray.js';

const app: Application = express();
const PORT: string = "3001";

app.listen(PORT, () => {
    console.log("Server started...");
});

app.on('error', (err) => {
    console.log("unable to start server", err)
})

//Task 1:
//    Create a end point to handle the "/products?category=cloths"
//    that return all the products from products.json file matching the category passed to users.
//    The products.json is json file with Title, Category and price as three properties.
app.get('/products', async (req: Request, res: Response) => {
    const { category } = req.query as { category: string };
    if (!category) {
        res.status(200);
        res.json({ products: [] , message: "Please mention a category"});
        return;
    }
    const requestedProducts = await getSpecifiedProducts(category.toLowerCase());
    res.status(200).json({ products: requestedProducts });
    return;
})

//Task 2:
//    Create a end point to handle the '/filterproducts?category=cloths&price=300"
//    that return all the products from products.json file matching the category and price>=(specified price) to users.
//    The products.json is json file with Title, Category and price as three properties.
app.get('/filterproducts', async (req: Request, res: Response) => {
    const { category, price } = req.query as { category: string, price: string };
    if (!category) {
        res.status(200);
        res.json({ products: [] , message: "Please mention a category"});
        return;
    }
    const requestedProducts = await getFilteredProducts(category, +price);
    res.status(200).json({ products: requestedProducts });
    return;
})
