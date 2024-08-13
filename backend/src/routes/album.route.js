import express from "express";
import { addAlbum, deleteAlbum, listAlbum, updateAlbum } from "../controllers/album.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route("/")
        .post(upload.single("image"), addAlbum)
        .get(listAlbum)

router.get("/", addAlbum);

router.route("/:albumId")
        // .get(addAlbum)
        // .update(updateAlbum)
        .delete(deleteAlbum)


export default router;