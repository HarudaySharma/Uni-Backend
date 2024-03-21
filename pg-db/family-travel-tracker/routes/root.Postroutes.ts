import { Router } from "express";
import { addCountry, addUser, switchUser} from "../controllers/root.controller.js";
import { usersAddPage } from "../middlewares/userAddPageRequest.js";

const router = Router();

// mark a country as visited for currentuser
router.post('/add', addCountry);

router.post('/user', /*checks if add user page is requested*/ usersAddPage, /*switch to other user*/ switchUser);

// add new user
router.post('/new', addUser);

export default router;
