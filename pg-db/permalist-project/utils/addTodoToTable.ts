import { PoolClient } from "pg";

type AddTodoToTableParams = {
    client: PoolClient,
    todos: string[],
}
const addTodoToTable = async ({client, todos}: AddTodoToTableParams) => {
    try {
        todos.forEach(async (todo) => {
            const res = await client.query('INSERT INTO todos(title) VALUES($1)', [todo]);
            if(!Boolean(res.rowCount))
                throw new Error(`Error adding TODO in addTodoToTable()`);
        })
    }
    catch(err) {
        throw err;
    }
}

export default addTodoToTable;

