const express = require("express");
const router = express.Router();
const Video = require("../models/Video");
const auth = require("../middleware/auth");
const generateID = require("../middleware/generateID");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

/*change the destination and file extension based on if the
file is the video or the thumbnail.
 */
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "video") {
            cb(null, "./videos/");
        } else {
            cb(null, "./thumbnails/");
        }
    },
    filename: (req, file, cb) => {
        if (file.fieldname === "video") {
            req.id.push(".mp4");
            cb(null, req.id.join(""));
        } else {
            req.id[req.id.indexOf(".mp4")] = ".jpg";
            cb(null, req.id.join(""));
        }
    }
});

const upload = multer({ storage });

//send video data (title, uploader and description)
router.get("/data/:id", async (req, res) => {
    const vidData = await Video.findOne({ id: req.params.id });
    if (vidData) {
        const { title, user, description } = vidData;
        await res.json({ title, user, description });
    } else {
        await res.status(404);
    }
});

//send video file from id
router.get("/file/:id", (req, res) => {
    res.sendFile(`/videos/${req.params.id}.mp4`, { root: "./" });
});

/*upload file from frontend with multer
only accepts mp4 and jpg files
this is a mess, I'll fix it later*/
router.post(
    "/upload",
    auth,
    generateID,
    upload.fields([{ name: "video" }, { name: "thumbnail" }]),
    (req, res) => {
        req.id.pop(); //pop .jpg from the end of id
        const video = new Video({
            title: req.body.title,
            id: req.id.join(""),
            user: req.user,
            description: req.body.description
        });

        video.save();
        res.json({ msg: "Successfully uploaded video!" });
    }
);

//remove video from db (does not remove it from the files)
router.post("/delete/:id", auth, async (req, res) => {
    const video = await Video.findOne({ id: req.params.id });

    if (!video) {
        return res.json({ msg: "Video doesn't exist" });
    }

    //remove thumbnail and video from disk
    fs.unlinkSync(path.join(__dirname, `../videos/${req.params.id}.mp4`));
    fs.unlinkSync(path.join(__dirname, `../thumbnails/${req.params.id}.jpg`));

    //check if the video uploader is the same as the currently authenticated user
    if (video.user === req.user) {
        video.remove();
        return res.json({ msg: "Successfully deleted video" });
    } else {
        return res.json({ msg: "this video isn't yours" });
    }
});

module.exports = router;
