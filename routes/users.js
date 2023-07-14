import express from "express";
import { createNewUser, userDetails, login, logout } from "../controllers/users.js";
import { validateUser } from "../middlewares/auth.js";

const router = express.Router();

//Routes Importing and Setting up the server routes here...

router.post("/new",createNewUser);

router.post("/login",login);

router.get("/logout",logout);

// dynamic routes

router.get("/user",validateUser,userDetails);

export default router;