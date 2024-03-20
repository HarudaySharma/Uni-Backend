import { Response, Router } from "express";
import { addCountry, addUser, resetVisited, userCountries } from "../controllers/root.controller.js";
import pgPool from "../services/postgres.client.js"
import { get_all_users_query, get_all_visited_countries_query, get_an_user_query } from "../queries/dbQueries.js";
import { changeCurrenUserId, currentUserId } from "../globals/user.global.js";


const router = Router();

router.get('/', async (req, res: Response) => {
    let pgClient;
    try {
        pgClient = await pgPool.connect();
        const allUsersQueryRes = await pgClient.query(get_all_users_query());
        const visitedCountries = await pgClient.query(get_all_visited_countries_query(currentUserId));

        // getting the current user info
        const currentUserQueryRes = await pgClient.query(get_an_user_query(currentUserId));
        const {color} = currentUserQueryRes.rows[0];

        const users = allUsersQueryRes.rows.map(user => user);
        const country_codes = visitedCountries.rows.map((row) => row.country_code);
        res.render("index.ejs", {
            countries: country_codes,
            total: country_codes.length,
            users: users,
            color: color,
        });
    }
    catch (err) {
        console.log(err);
        res.send(`<h1 align='center'>SOMETHING WENT WRONG</h1>`);
        return;
    }
    finally {
        pgClient?.release();
    }
});

router.post('/add', addCountry);
router.post('/user', userCountries);
router.post('/new', addUser);
router.get('/reset/:codeWord', resetVisited);

export default router;
