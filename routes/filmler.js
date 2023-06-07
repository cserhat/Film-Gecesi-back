import express from "express"
import {addFilm, deleteFilm, getFilm, getFilmler, putFilm} from "../controllers/filmler.js"

const router = express.Router()
router.get("/", getFilmler )
router.get("/:slug", getFilm)
router.post("/", addFilm)
router.delete("/:id", deleteFilm)
router.put("/:id", putFilm)

export default router