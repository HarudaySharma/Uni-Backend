import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    hobbies: [String],
    userName: {
        type: String,
        unique: true,
    },
    password: String,
});

const User = mongoose.model("User", userSchema);

export default User;
