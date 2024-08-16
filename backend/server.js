import path from "path";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import authRoute from "./src/routes/auth.route.js";
import songRoute from "./src/routes/song.route.js";
import albumRoute from "./src/routes/album.route.js";
import connectDB from "./src/config/database.js";

const app = express();

const PORT = Number(process.env.PORT || "8000");
const __dirname = path.resolve();

app.use(cors({origin: ["http://localhost:5173"]}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/song", songRoute);
app.use("/api/v1/album", albumRoute);

if(process.env.NODE_ENV === "production") {

    app.use(express.static(path.join(__dirname, "./frontend/dist")));

    app.use("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });

}

connectDB()
.then(() => app.listen(PORT, () => console.log(`App listening on port:${PORT}`)))
.catch((error) => console.log(error))