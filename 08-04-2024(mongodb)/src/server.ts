import client from "./services/mongodb.service.js";

async function run() {
    try {
        console.log('connecting');
        await client.connect()
        const db = client.db('06May2024');
        const collection = db.collection('backendClass');
        await collection.deleteMany();
        await collection.insertMany([
            {
                name: "harry",
                roll_no: '2211981168'
            },
            {
                name: "haruday",
                roll_no: '2211981169'
            },
            {
                name: "hritvik",
                roll_no: '2211981172'
            },
        ]);
        console.log(await collection.find().toArray());
    }
    catch(err) {
        console.log(err);
    }
    finally {
        await client.close();
    }
}
await run();
