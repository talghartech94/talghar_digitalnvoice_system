import { Router } from "express";
import { syncAll, getProvinces } from "../controllers/provinceController.js";

const router = Router();

router.post("/sync", syncAll);
router.get("/", getProvinces);

export default router;