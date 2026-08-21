import express from "express";

import UserEnquiry from "../Controllers/UserController.js";

const router = express.Router();

router.post("/enquiries", UserEnquiry);

export default router;
