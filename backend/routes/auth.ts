// backend/routes/auth.ts -> backend/controllers/authController.ts
import { Router } from "express";
// import the controller functions
import { signupController } from "../controllers/authController";

const router = Router();

router.post("/signup", signupController);

export default router;
