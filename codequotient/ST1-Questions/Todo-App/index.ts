import express, { Application, Request, Response } from 'express'
import { getProductsArray, getSpecifiedProducts } from './utils/getProductsArray.js';
import { STATUS, TASK } from './types.js';
import { addNewTask, getTasksViaStatus } from './utils/addNewTask.js';

const app: Application = express();
const PORT: string = "3001";

//Task 1:
//    Create a Nodejs server to handle request at port 3001,
//    give proper message at console "Server started..." if actually it started 
app.listen(PORT, () => {
    console.log("Server started...");
});

app.on('error', (err) => {
    console.log("unable to start server", err)
})

app.use(express.json());

//Task 1:
//    Create a end point "/addtask" to  receive data from html page like title and id and status,
//    store in into a json file todo.json,
//    the json file contains an array so update the array with new task.
app.post('/addTask', async (req: Request, res: Response) => {
    const {title, id, status} =  req.body as TASK;
    try {
        const success = await addNewTask({title, id, status});
        if(!success) {
            console.log('failed to add new task');
            res.status(501).json({message: "failed to add task"});
            return;
        }
            res.status(200).json({message: "task added successfully"});
            return;
    }
    catch(err) {
        console.log(err);
        res.status(501).json({message: "failed to add task"});
        return;
    }
})

//Task 2:
//    Create an endpoint to handle the request "/tasks?status=pending"
//    and return all the tasks from json with status=pending
app.get('/tasks', async(req: Request, res: Response) => {
    const {status} = req.query as {status: STATUS};
    if(!status) {
        res.status(400).json({message: "invalid query"});
        return;
    }
    try {
        const tasks = await getTasksViaStatus(status);
        res.status(200).json(tasks);
        return;
    }
    catch(err) {
        console.log(err);
        res.status(501).json({message: "failed to get task you asked"});
        return;
    }
})
