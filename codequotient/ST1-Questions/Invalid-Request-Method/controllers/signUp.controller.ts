import { Request, Response } from "express";
import { USER } from "../types.js";
import { saveUser } from "../utils/saveUser.js";

//- Task 1:
//    Create Signup page with "/signup" post endpoint to receive user details 
//    like name, gender and age from the html page, store this data in users.txt file, 
//    which already contains the users as object with properties like name, gender and age.
export const signUpController = async (req: Request, res: Response) => {
    const { name, gender, age } = req.body as USER;
    const user: USER = { name, gender, age }
    try {
        await saveUser(user);
        res.status(200).json({ message: "user saved successfully" });
        return;
    }
    catch (err) {
        console.log(err);
        res.status(501);
    }
}
