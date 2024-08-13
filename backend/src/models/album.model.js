import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    name: { type: String, require: true, trim: true },
    desc: { type: String, require: true, trim: true },
    bgColor: { type: String, require: true, trim: true },
    image: { type: String, require: true, trim: true },
}, { timestamps: true });

const AlbumModel = mongoose.models.albums || mongoose.model("Album", albumSchema);

export default AlbumModel;