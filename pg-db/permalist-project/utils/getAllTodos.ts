import { PoolClient } from "pg";
import { TODOITEM } from "../types";

const getAllTodos = async (client: PoolClient): Promise<TODOITEM[]> => {
    try {
        const res = await client.query('SELECT * FROM todos');
        return res.rows;
    }
    catch(err) {
        throw err;
    }
}

export default getAllTodos;
