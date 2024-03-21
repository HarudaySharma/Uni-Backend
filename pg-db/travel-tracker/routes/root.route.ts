import { Response, Router } from "express";
import { addCountry, resetVisited } from "../controllers/root.controller.js";
import pgPool from "../services/postgres.client.js"
import { get_all_visited_countries_query } from "../queries/dbQueries.js";


const router = Router();

router.get('/', async (req, res: Response) => {
    let pgClient;
    try {
        pgClient = await pgPool.connect();
        const visitedCountries = await pgClient.query(get_all_visited_countries_query());
        const country_codes = visitedCountries.rows.map((row) => row.country_code);
        res.render('index', {
            total: country_codes.length,
            countries: country_codes
        });
    }
    catch (err) {
        res.send(`<h1 align='center'>SOMETHING WENT WRONG</h1>`);
        return;
    }
    finally {
        pgClient?.release();
    }
});

router.post('/add', addCountry);
router.get('/reset/:codeWord', resetVisited);


export default router;
