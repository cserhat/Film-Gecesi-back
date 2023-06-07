import express from "express"
import { login, logout, register } from "../controllers/auth.js"

const router = express.Router()

router.post("/uye-ol", register)
router.post("/giris-yap", login)
router.post("/cikis-yap", logout)

export default router