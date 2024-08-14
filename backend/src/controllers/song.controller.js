import cloudinary from "../middlewares/cloudinary.js";
import AlbumModel from "../models/album.model.js";
import SongModel from "../models/song.model.js";
import { uploadFile } from "../utils/uploadFile.js";



export const addSong = async (req, res) => {

    const { name, desc, album } = req.body;

    let imageFile;
    let audioFile;

    if(req.files?.image && req.files?.audio) {
        imageFile = req.files.image[0];
        audioFile = req.files.audio[0];
    }

    try {

        const albumExist = await AlbumModel.findById(album);

        if(!albumExist) {
            return res.status(400).json({ success: false, message: "Album not found"})
        }

        const audioUploader = await uploadFile(audioFile.path, { resource_type: "video" });
        const imageUploader = await uploadFile(imageFile.path, {
            resource_type: "image",
            transformation: [
                { width: 500, height: 500, crop: "limit" }
              ]
        });

        const newSong = new SongModel({
            name,
            desc,
            album,
            duration: `${Math.floor(audioUploader.duration/60)}:${Math.floor(audioUploader.duration%60)}`, 
            image: imageUploader.secure_url || "",
            audio: audioUploader.secure_url || "" 
        });

        const savedSong = await newSong.save();

        if(!savedSong) {
            return res.status(400).json({ success: false, message: "Unable to create song"})
        }

        await AlbumModel.findByIdAndUpdate(album, {
            $addToSet: {
                albumSongs: savedSong.id 
            }});
        
        const response = {
            data: savedSong,
            success: true, 
            message: "Song created successfully"
        }

        return res.status(201).json(response);

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Something went wrong"})
    }
}

export const listSongs = async (req, res) => {
    try {

        const songs = await SongModel.find({}).populate({
            path: "album",
            select: "name albumSongs"
        });

        if(!songs) {
            return res.status(400).json({ success: false, message: "No song"})
        }

        // console.log(JSON.stringify(songs.albumSongs))

        const response = {
            data: songs,
            success: true, 
            message: "All songs"
        }

        return res.status(200).json(response);
        
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong"})
    }
}

export const updateSong = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong"})
    }
}

export const deleteSong = async (req, res) => {

    const { songId } = req.params;

    try {

        const song = await SongModel.findById(songId);

        if(!song) {
            return res.status(404).json({ success: false, message: "Song not found"})
        }

        if(song.image) {
            const cloudinaryImageId = song.image.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(cloudinaryImageId);
        }

        if(song.audio) {
            const cloudinaryAudioId = song.audio.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(cloudinaryAudioId);
        }

        const deletedSong = await SongModel.findByIdAndDelete(songId);

        if(!deletedSong) {
            return res.status(400).json({ success: false, message: "Unable to delete song"})
        }

        return res.status(200).json({ success: true, message: "Song deleted"})
        
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong"})
    }
}

