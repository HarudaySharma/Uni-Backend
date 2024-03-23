import { Request, Response } from "express";
import pgPool from '../services/postgres.client.js';
import {
    add_new_user_query,
    check_in_visted_countries_query,
    find_country_query, find_user_query, get_all_users_query, get_all_visited_countries_query,
    get_an_user_query,
    insert_into_visited_countries,
    reset_visited_countries
} from "../queries/dbQueries.js";
import { changeCurrenUserId, currentUserId } from "../globals/user.global.js";


export const resetVisited = async (req: Request, res: Response) => {
    const { codeWord } = req.params as { codeWord: string };
    if (codeWord !== 'techisevil') {
        res.status(401).send(`<h1 align='center' style='color: red'>Wrong Code</h1>`);
        return;
    }
    let pgClient;
    try {
        pgClient = await pgPool.connect();
        const dbres = await pgClient.query(reset_visited_countries(currentUserId));
        console.log(dbres);
        if (Boolean(dbres.rowCount)) {
            res.status(200).send(`<h1 align='center' style='color: green'>Operation Successfull</h1>`)
            return;
        }
        res.status(501).send(`<h1 align='center' style='color: red'>Operation UnSuccessfull</h1>`)
        console.log();
    }
    catch (err) {
        res.status(501).json({ message: "INTERNAL SERVER ERROR" });
        console.log(err);
    }
    finally {
        pgClient?.release();
    }
}

export const switchUser = async (req: Request, res: Response) => {
    const { user } = req.body as { user: number };
    if (user == undefined) {
        res.status(404).json({ message: "userid missing" });
        return;
    }
    let pgClient
    try {
        pgClient = await pgPool.connect();
        changeCurrenUserId(user);
        const visitedCountries = await pgClient.query(get_all_visited_countries_query(currentUserId));
        const currentUserQueryRes = await pgClient.query(get_an_user_query(currentUserId));
        const allUsersQueryRes = await pgClient.query(get_all_users_query());

        const { color } = currentUserQueryRes.rows[0];
        const users = allUsersQueryRes.rows.map(user => user);
        const country_codes = visitedCountries.rows.map((row) => row.country_code);
        console.log(color);
        res.render("index", {
            countries: country_codes,
            total: country_codes.length,
            users: users,
            color: color,
        });
    }
    catch (err) {
        res.status(501).json({ message: "INTERNAL SERVER ERROR" });
        console.log(err);
        return;
    }
    finally {
        pgClient?.release();
    }
}

// insert a new user 
//Hint: The RETURNING keyword can return the data that was inserted.
//https://www.postgresql.org/docs/current/dml-returning.html
export const addUser = async (req: Request, res: Response) => {
    const { name, color } = req.body as { name: string, color: string };
    if (!name || !color) {
        res.status(404).json({ message: "please select again" });
        return;
    }
    console.log(name, color);
    let pgClient;
    try {
        pgClient = await pgPool.connect();

        //check if the user exists
        const queryRes = await pgClient.query(find_user_query(name));
        if (Boolean(queryRes.rowCount)) {
            res.status(400).json({ message: "USER ALREADY EXISTS" });
            return;
        }
        //add user to database
        const userInserted = await pgClient.query(add_new_user_query(name, color));
        console.log(userInserted);
        if (!userInserted.rowCount) {
            res.status(500).json({ message: "ERROR IN CODE" });
            return;
        }
        res.redirect('/');
        // res.status(200).json({ message: "User Added Successfully" });
    }
    catch (err) {
        res.status(501).json({ message: "INTERNAL SERVER ERROR" });
        console.log(err);
        return;
    }
    finally {
        pgClient?.release();
    }
}

// send all the country codes for a particular user;
export const userCountries = async (req: Request, res: Response) => {
    const { user } = req.body as { user: number };
    console.log(user);
    if (!user) {
        res.status(404).json({ message: "no user selected" });
        return;
    }
    changeCurrenUserId(user);
    res.redirect('/');
}


export const addCountry = async (req: Request, res: Response) => {
    const { country } = req.body as { country: string };
    console.log(country);
    if (country == undefined) {
        res.status(404).json({ message: "please enter and valid country" });
        return;
    }
    console.log("current-User :", currentUserId);
    let pgClient;
    try {
        pgClient = await pgPool.connect();

        // getting the country information from countries table
        const foundCountries = await pgClient.query(find_country_query(country));

        // get all the visited_countries of current User
        const visitedCountries = await pgClient.query(get_all_visited_countries_query(currentUserId));
        const country_codes = visitedCountries.rows.map((row) => row.country_code);

        const allUsersQueryRes = await pgClient.query(get_all_users_query());
        const users = allUsersQueryRes.rows.map(user => user);
        const currentUserQueryRes = await pgClient.query(get_an_user_query(currentUserId));
        const { color } = currentUserQueryRes.rows[0];

        //if country not found in countries
        if (!Boolean(foundCountries.rowCount)) {
            res.render('index', {
                countries: country_codes,
                total: country_codes.length,
                users,
                color,
                error: "country not found, Please Try again!"
            });
            return;
        }

        // check if country is already visited
        const { country_code, id } = foundCountries.rows[0];
        const countries = await pgClient.query(check_in_visted_countries_query(id, currentUserId));

        if (Boolean(countries.rowCount)) {
            res.render('index', {
                users,
                color,
                countries: country_codes,
                total: country_codes.length,
                error: "country is already marked"
            });
            return;
        }

        //save the country in visited_countries
        await pgClient.query(insert_into_visited_countries(id, country_code, currentUserId));
        // send the appropriate response to client
        country_codes.push(country_code);
        res.render('index', {
            users,
            color,
            countries: country_codes,
            total: country_codes.length,
        })
        return;
    }
    catch (err) {
        res.status(501).json({ message: "INTERNAL SERVER ERROR" });
        console.log(err);
        return;
    }
    finally {
        pgClient?.release();
    }
}
