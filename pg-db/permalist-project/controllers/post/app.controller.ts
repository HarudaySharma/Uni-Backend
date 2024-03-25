import { Request, Response } from "express";
import { PoolClient } from "pg";
import pgPool from '../../services/postgres.client.js'
import addTodoToTable from "../../utils/addTodoToTable.js";
import deleteTodoFromTable from "../../utils/deleteTodoFromTable.js";
import editSavedTodo from "../../utils/editSavedTodo.js";

export const addTodo = async (req: Request, res: Response) => {
    const {newItem} = req.body as {newItem: string};
    if(!Boolean(newItem)) {
        res.status(400).json({message: 'please write the todo'});
        return;
    }
    let pgClient: PoolClient | undefined;
    try {
        pgClient = await pgPool.connect();
        await addTodoToTable({client: pgClient, todos: [newItem]});
        res.redirect('/');
    }
    catch(err) {
        console.log(err);
        res.status(501).json({message: 'FAILED TO ADD TODO'});
        return;
    }
    finally{
        pgClient?.release();
    }
}

export const deleteTodo = async (req: Request, res: Response) => {
    const {deleteItemId} = req.body as {deleteItemId: string};
    if(!Boolean(deleteItemId)) {
        res.status(400).json({message: 'please write the todo'});
        return;
    }
    let pgClient: PoolClient | undefined;
    try {
        pgClient = await pgPool.connect();
        await deleteTodoFromTable({client: pgClient,  id: deleteItemId});
        res.redirect('/');
    }
    catch(err) {
        console.log(err);
        res.status(501).json({message: 'FAILED TO ADD TODO'});
        return;
    }
    finally{
        pgClient?.release();
    }
}

export const editTodo = async (req: Request, res: Response) => {
    const {updatedItemId, updatedItemTitle} = req.body as {updatedItemId: string, updatedItemTitle: string};
    if(!Boolean(updatedItemTitle) || !Boolean(updatedItemId)) {
        res.status(400).json({message: 'please write the todo'});
        return;
    }
    let pgClient: PoolClient | undefined;
    try {
        pgClient = await pgPool.connect();
        await editSavedTodo({client: pgClient, id: updatedItemId, newTitle: updatedItemTitle});
        res.redirect('/');
    }
    catch(err) {
        console.log(err);
        res.status(501).json({message: 'FAILED TO ADD TODO'});
        return;
    }
    finally{
        pgClient?.release();
    }

}
