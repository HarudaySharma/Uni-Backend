import { PoolClient } from "pg";
import deleteTodoFromTable from "./deleteTodoFromTable";
import addTodoToTable from "./addTodoToTable";

type EditSavedTodoParams = {
    client: PoolClient,
    id: string,
    newTitle: string,
}
const editSavedTodo = async ({ client, id, newTitle}: EditSavedTodoParams) => {
    try {
        const res = await client.query(`UPDATE todos SET title = $1 WHERE id = $2;`, [newTitle, id]);
        if(!Boolean(res.rowCount))
                throw new Error(`Error editing TODO in editSavedTodo()`);
    }
    catch (err) {
        throw err;
    }
}

export default editSavedTodo;


