import express, { Application, Request, Response } from 'express'
import { TASK } from './types.js';
import {deleteTask, getTasks} from './utils/addNewTask.js';

const app: Application = express();
const PORT: string = "3001";

//Task 1:
//    Create a Nodejs server to handle request at port 3001,
//    give proper message at console "Server started..."
//    if actually it started or give "unable to start server" 
//    if there is an issue in starting the server.
app.listen(PORT, () => {
    console.log("Server started...");
});

app.on('error', (err) => {
    console.log("unable to start server", err)
})


//Task 2:
//    Create an end point "/" that return all the tasks from todo.json file to client.
//    The todo.json is json file contains array of 
//    task objects with each object having properties as id, title and status,store some dummy data
app.get('/', async (req: Request, res: Response) => {
    try {
        const tasks: TASK[] = await getTasks();
        if(!tasks) {
            console.log('failed to fetch');
            res.status(501).json({message: "failed to fetch all tasks"});
            return;
        }
            res.status(200).json(tasks);
            return;
    }
    catch(err) {
        console.log(err);
        res.status(501).json({message: "failed to add task"});
        return;
    }
})

//Task 3:
//    Create an end point "/delete?id=1" to delete the task with the id=1 and return the pending tasks.
app.put('/delete', async(req: Request, res: Response) => {
    const {id} = req.query;
    if(!id) {
        res.status(400).json({message: "invalid query"});
        return;
    }
    try {
        const tasks = await deleteTask(+id);
        res.status(200).json(tasks);
        return;
    }
    catch(err) {
        console.log(err);
        res.status(501).json({message: "failed to delete task"});
        return;
    }
})
