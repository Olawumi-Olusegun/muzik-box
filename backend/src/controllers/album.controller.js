import cloudinary from "../middlewares/cloudinary.js";
import AlbumModel from "../models/album.model.js";
import SongModel from "../models/song.model.js";
import { uploadFile } from "../utils/uploadFile.js";


export const addAlbum = async (req, res) => {

    const { name, desc, bgColor } = req.body;
    const imageFile = req.file;

    try {

        if(!imageFile) {
            return res.status(400).json({ success: false, message: "Album image is required"}) 
        }

        const uploadResponse = await uploadFile(imageFile?.path, {
            resource_type: "image",
            transformation: [
                {
                    width: 500,
                    height: 500,
                    crop: "limit"
                }
              ]
        });

        if(!uploadResponse || !uploadResponse?.secure_url) {
            return res.status(400).json({ success: false, message: "Album image not uploaded"}) 
        }

        const newAlbum = new AlbumModel({ name, desc, bgColor, image: uploadResponse.secure_url });

        const savedAlbum = await newAlbum.save();

        if(!savedAlbum) {
            return res.status(400).json({ success: false, message: "Unable to create album"})
        }

        return res.status(201).json({ success: true, message: "Album created"});
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Something went wrong"})
    }
}

export const fetchAllAlbum = async (req, res) => {
    try {

        const albums = await AlbumModel.find({}).select("name")

        if(!albums) {
            return res.status(404).json({ success: false, message: "No album found"})
        }

        const response = {
            data: albums,
            success: true, 
            message: "All albums"
        }

        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong"})
    }
}

export const listAlbum = async (req, res) => {
    try {

        const albums = await AlbumModel.find({ albumSongs: { $ne: [] } })
                        .populate({
                            path: "albumSongs",
                            match: { $ne: [] }, 
                        })

        if(!albums) {
            return res.status(404).json({ success: false, message: "No album found"})
        }

        const response = {
            data: albums,
            success: true, 
            message: "All albums"
        }

        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong"})
    }
}

export const fetchAlbum = async (req, res) => {

    const { albumId } = req.params;

    try {

        const album = await AlbumModel.findById(albumId)
                    .populate({ path: "albumSongs", match: { $ne: [] }, });
        
        if(!album) {
            return res.status(404).json({ success: false, message: "Album not found"})
        }

 
        const response = {
            data: album,
            success: true, 
            message: "Single album"
        }
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong"})
    }
}

export const updateAlbum = async (req, res) => {
    try {

    } catch (error) {
        
    }
}

export const deleteAlbum = async (req, res) => {
    
    const { albumId } = req.params;

    try {

        const album = await AlbumModel.findById(albumId);

        if(!album) {
            return res.status(404).json({ success: false, message: "Song not found"})
        }

        if(album.image) {
            const cloudinaryImageId = album.image.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(cloudinaryImageId);
        }

        const deletedSong = await AlbumModel.findByIdAndDelete(albumId);

        if(!deletedSong) {
            return res.status(400).json({ success: false, message: "Unable to delete album"})
        }

        return res.status(200).json({ success: true, message: "Album deleted"})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Something went wrong"})
    }
}