import express from 'express'
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

// router object
const router = express.Router()

// Routing
// Register || Method Post
router.post('/register',  registerController)

// login ||POST
router.post('/login', loginController)

// test route
router.get('/test', requireSignIn,isAdmin, testController)


export default router 