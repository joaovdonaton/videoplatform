import React, { useState, useContext } from "react";
import "../../../style/Upload.css";
import "../../../style/Login.css";
import axios from "axios";
import { Context } from "../../../context/Context";

function Upload() {
    const [selectedVideo, setSelectedVideo] = useState("");
    const [selectedThumbnail, setSelectedThumbnail] = useState("");
    const [title, setTitle] = useState("");
    const [uploadResult, setUploadResult] = useState("");
    const [description, setDescription] = useState("");
    const context = useContext(Context);

    //update state based on form input
    const onChange = e => {
        switch (e.target.name) {
            case "video":
                setSelectedVideo(e.target.files[0]);
                break;
            case "thumbnail":
                setSelectedThumbnail(e.target.files[0]);
                break;
            case "title":
                setTitle(e.target.value);
                break;
            case "description":
                setDescription(e.target.value);
                break;
            default:
                break;
        }
    };

    const onSubmit = async e => {
        e.preventDefault();

        //send form data to the backend
        let videoFormData = new FormData();
        videoFormData.append("video", selectedVideo);
        videoFormData.append("thumbnail", selectedThumbnail);

        const videoResp = await axios.post(
            "http://localhost:3001/video/upload",
            videoFormData,
            {
                headers: {
                    token: context.token,
                    videoTitle: title,
                    description
                }
            }
        );
        setUploadResult(videoResp.data.msg);
    };

    return (
        <div className="container">
            {uploadResult ? (
                <p style={{ fontSize: "2em" }}>{uploadResult}</p>
            ) : (
                <form onSubmit={onSubmit}>
                    <label htmlFor="select-video" className="upload-button">
                        Select Video File (MP4)
                    </label>
                    <input
                        id="select-video"
                        type="file"
                        name="video"
                        onChange={onChange}
                    />
                    <label>
                        Currently selected video file:{" "}
                        <b>{selectedVideo.name}</b>
                    </label>
                    <br />
                    <label htmlFor="select-thumbnail" className="upload-button">
                        Select Image File (JPG)
                    </label>
                    <input
                        id="select-thumbnail"
                        type="file"
                        name="thumbnail"
                        onChange={onChange}
                    />
                    <label>
                        Currently selected thumbnail:{" "}
                        <b>{selectedThumbnail.name}</b>
                    </label>
                    <br />
                    <label style={{ fontSize: "1.5em", margin: "1em" }}>
                        Title:
                    </label>
                    <input
                        value={title}
                        type="text"
                        onChange={onChange}
                        className="upload-text-area"
                        name="title"
                    />
                    <br />
                    <label style={{ fontSize: "1.5em", margin: "1em"}}> 
                        Description
                    </label>
                    <br/>
                    <textarea
                        value={description}
                        onChange={onChange}
                        className="upload-text-area"
                        name="description"
                        rows="6"
                        cols="45"
                        style={{ margin: "0.5em 1em" }}
                    ></textarea>
                    <br />
                    <button type="submit" className="upload-button">
                        Upload Video
                    </button>
                </form>
            )}
        </div>
    );
}

export default Upload;
