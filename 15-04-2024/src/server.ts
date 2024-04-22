import mongoose from 'mongoose';
import User from './models/user.model.js';

mongoose.connect('mongodb://localhost:27017', {
    dbName: "15Apr2024",
    user: "admin",
    pass: "secret"
});

async function run() {
    const user = await User.create({
        firstName: "Harshit",
        lastName: "Thakur",
        age: 19,
        password: "harry123",
        userName: "harry",
    })
    await user.save();
    console.log(user);
}
await run();
