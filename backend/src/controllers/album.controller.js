import cloudinary from "../middlewares/cloudinary.js";
import AlbumModel from "../models/album.model.js";
import { uploadFile } from "../utils/uploadFile.js";


export const addAlbum = async (req, res) => {

    const { name, desc, bgColor } = req.body;
    const imageFile = req.file;

    try {

        const uploadResponse = await uploadFile(imageFile.path, {
            resource_type: "image",
            transformation: [
                { width: 500, height: 500, crop: "limit" }
              ]
        });

        const newAlbum = new AlbumModel({name, desc, bgColor, image: uploadResponse.secure_url });

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

export const listAlbum = async (req, res) => {
    try {

        const albums = await AlbumModel.find({});

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