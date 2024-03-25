import { Request, Response } from "express";
import { PoolClient } from "pg";

import pgPool from '../../services/postgres.client.js';
import getAllTodos from "../../utils/getAllTodos.js";

export const getIndexPage = async(req: Request, res: Response) => {
    let pgClient: PoolClient | undefined;
    try {
        pgClient = await pgPool.connect();
        const items = await getAllTodos(pgClient);
        res.render('index', {
            listTitle: "Today",
            listItems: items
        });
        return;
    }
    catch(err) {
        console.log(err);
        return;
    }
    finally {
        pgClient?.release();
    }
}
