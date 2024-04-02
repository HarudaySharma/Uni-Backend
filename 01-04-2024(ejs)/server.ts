import express from 'express'

import rootRoutes from './routes/root.routes.js';

const app = express();
const PORT = 42010;

app.use(express.json());
app.set('view engine', 'ejs');


app.use('/', rootRoutes);

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
})

