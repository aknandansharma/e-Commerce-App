import express from 'express'
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

// router object
const router = express.Router()

// Routing
// Register || Method Post
router.post('/register',  registerController)

// login ||POST
router.post('/login', loginController)

//Forgot Password || Post
router.post('/forgot-password', forgotPasswordController)

// test route
router.get('/test', requireSignIn,isAdmin, testController)

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router 