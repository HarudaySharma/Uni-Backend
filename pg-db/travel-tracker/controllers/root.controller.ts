import { Request, Response } from "express";
import pgPool from '../services/postgres.client.js';
import {
    check_in_visted_countries_query,
    find_country_query, get_all_visited_countries_query,
    insert_into_visited_countries,
    reset_visited_countries
} from "../queries/dbQueries.js";


export const resetVisited = async (req: Request, res: Response) => {
    const { codeWord } = req.params as { codeWord: string };
    if (codeWord !== 'techisevil') {
        res.status(401).send(`<h1 align='center' style='color: red'>Wrong Code</h1>`);
        return;
    }
    let pgClient;
    try {
        pgClient = await pgPool.connect();
        const dbres = await pgClient.query(reset_visited_countries());
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

export const addCountry = async (req: Request, res: Response) => {
    const { country } = req.body as { country: string };
    console.log(country);
    if (!country) {
        res.status(404).json({ message: "please enter and valid country" });
        return;
    }
    let pgClient;
    try {
        pgClient = await pgPool.connect();
        // check if country is already visited
        const countries = await pgClient.query(check_in_visted_countries_query(country));
        const visitedCountries = await pgClient.query(get_all_visited_countries_query());
        const country_codes = visitedCountries.rows.map((row) => row.country_code);
        if (Boolean(countries.rowCount)) {
            res.render('index', {
                countries: country_codes,
                total: country_codes.length,
                error: "country is already marked"
            });
            return;
        }
        // get the country from countries table
        const foundCountries = await pgClient.query(find_country_query(country));
        //if country not found
        if (!Boolean(foundCountries.rowCount)) {
            res.render('index', {
                countries: country_codes,
                total: country_codes.length,
                error: "country not found, Please Try again!"
            });
            return;
        }

        //save the country in visited_countries
        const { country_name, country_code, id } = foundCountries.rows[0];
        await pgClient.query(insert_into_visited_countries(country_name, country_code, id));
        // send the appropriate response to client
        country_codes.push(country_code);
        res.render('index', {
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
