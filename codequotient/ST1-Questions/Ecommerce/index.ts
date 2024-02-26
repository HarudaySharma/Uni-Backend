import express, { Application, Request, Response } from 'express'
import { getProductsArray, getSpecifiedProducts } from './utils/getProductsArray.js';

const app: Application = express();
const PORT: string = "3001";

//Task 1:
//    Create a Nodejs server to handle request at port 3001,
//    give proper message at console "Server started..." if actually it started 
app.listen(PORT, () => {
    console.log("Server started...");
});

app.on('error', (err) => {
    console.log("unable to start server", err)
})

//Task 2:
//Create a end point "/" return all the products from products.json file to users.
//The products.json is json file with Title, Category and price as three properties.
app.get('/', async (req: Request, res: Response) => {
    //Task 3/4:
    // Add some products in file with category="Food" and category="Others"
    //Edit the above endpoint to receive the category and return the products matching the category 
    //e.g /?category=food returns all the products with category=food

    const { category } = req.query as { category: string };
    if (!category) {
        const products = await getProductsArray();
        res.json({ products: products });
        return;
    }
    const requestedProducts = await getSpecifiedProducts(category.toLowerCase());
    res.json({ products: requestedProducts });
    return;
})



