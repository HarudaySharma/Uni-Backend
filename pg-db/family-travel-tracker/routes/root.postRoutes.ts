import { Router } from "express";
import { addCountry, addUser, switchUser } from "../controllers/root.controller.js";
import { usersAddPage } from "../middlewares/userAddPageRequest.js";

const router = Router();

// mark a country as visited for currentuser
router.post('/add', addCountry);

/*checks if add user page is requested*/
/*switch to other user*/
router.post('/user', usersAddPage, switchUser);

// add new user
router.post('/new', addUser);

export default router;
