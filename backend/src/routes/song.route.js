import express from "express";
import { addSong, deleteSong, listSongs, updateSong } from "../controllers/song.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

const uploadFields = [
      {name: "image", maxCount: 1 },
      {name: "audio", maxCount: 1 },
];

router.route("/")
      .post(upload.fields(uploadFields), addSong)
      .get(listSongs)

router.route("/:songId")
      .get(updateSong)
      .delete(deleteSong)

export default router;