import { MongoClient } from "mongodb";

const client = new MongoClient('mongodb+srv://haruday:haru123@cluster0.2pvvcpo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

export default client;

