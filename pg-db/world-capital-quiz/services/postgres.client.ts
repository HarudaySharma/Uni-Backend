import pg from 'pg'

const client = new pg.Client({
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'haru@123',
    database: 'world_quiz'
})

client.on('error', (err) => {
    console.log("POSTGRES ERROR");
    console.error(err);
})
export default client;
