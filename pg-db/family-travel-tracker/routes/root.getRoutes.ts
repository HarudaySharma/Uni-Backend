import { Response, Router } from "express";
import pgPool from "../services/postgres.client.js"
import { get_all_users_query, get_all_visited_countries_query, get_an_user_query } from "../queries/dbQueries.js";
import { currentUserId } from "../globals/user.global.js";
import { resetVisited } from "../controllers/root.controller.js";


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
        console.log(visitedCountries);
        const country_codes = visitedCountries.rows.map((row) => row.country_code);
        console.log(country_codes);
        res.render("index", {
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

// reset the visited countries of current user
router.get('/user/reset/:codeWord', resetVisited);

export default router;
