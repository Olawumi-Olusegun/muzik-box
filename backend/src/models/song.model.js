import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    name: { type: String, require: true, trim: true },
    desc: { type: String, require: true, trim: true },
    album: { type: String, require: true, trim: true },
    image: { type: String, require: true, trim: true },
    audio: { type: String, require: true, trim: true },
    duration: { type: String, require: true, trim: true },
}, { timestamps: true });

const SongModel = mongoose.models.songs || mongoose.model("Song", songSchema);

export default SongModel;