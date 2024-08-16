import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    fullName: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, lowercase: true, unique: true },
    password: { type: String, trim: true, required: true },
    isAdmin: { type: String, trim: true, default: false },
    profileImage: { type: String, trim: true, default: "" },
    coverImage: { type: String, trim: true, default: "" },
    accessToken: { type: String, trim: true, default: "" },
    refreshToken: { type: String, trim: true, default: "" },
}, {timestamps: true});

userSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        const salt = await bcrypt.genSalt(12);
        this.password = bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.methods.isValidPassword = async function(plainPassword) {
    try {
        return await bcrypt.compare(this.password, plainPassword);
    } catch (error) {
        throw error;
    }
}

const UserModel = mongoose.models.users || mongoose.model("User", userSchema);

export default UserModel;