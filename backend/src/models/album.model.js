import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    name: { type: String, require: true, trim: true },
    desc: { type: String, require: true, trim: true },
    bgColor: { type: String, require: true, trim: true },
    image: { type: String, require: true, trim: true },
    albumSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song", default: [] }]
}, { timestamps: true });

const AlbumModel = mongoose.models.albums || mongoose.model("Album", albumSchema);

export default AlbumModel;