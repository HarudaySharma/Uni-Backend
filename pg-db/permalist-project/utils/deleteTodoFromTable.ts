import { PoolClient } from "pg";

type DeleteTodoFromTableParams = {
    client: PoolClient,
    id: string,
}
const deleteTodoFromTable = async ({ client, id }: DeleteTodoFromTableParams) => {
    try {
        const res = await client.query('DELETE FROM todos WHERE id = $1;', [id]);
        if (!Boolean(res.rowCount))
            throw new Error(`Error deleting TODO in deleteTodoFromTable()`);
    }
    catch (err) {
        throw err;
    }
}

export default deleteTodoFromTable;


