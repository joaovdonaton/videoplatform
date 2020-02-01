import React, { useState, useContext, useEffect } from "react";
import "../../../style/VideoItem.css";
import { Link } from "react-router-dom";
import { Context } from "../../../context/Context";
import axios from "axios";

function VideoItem({ id }) {
    const [thumbnailURL, setThumbnailURL] = useState("");
    const [videoData, setVideoData] = useState({ title: null, user: null });
    const [username, setUsername] = useState("");
    const context = useContext(Context);

    useEffect(() => {
        async function getData(){
            //fetch thumbnail image from backend
            if (!thumbnailURL) {
                const resp = await fetch(
                    `http://localhost:3001/thumbnail/getthumb/${id}`
                );
                setThumbnailURL(URL.createObjectURL(await resp.blob()));
            }

            //fetch video data from backend
            if (videoData.title == null || videoData.user == null) {
                const resp = await axios.get(
                    `http://localhost:3001/video/data/${id}`
                );
                const { title, user } = resp.data;
                setVideoData({ title, user });
            }

            //authenticate user and show delete option
            if (!username && context.token) {
                const resp = await axios.post(
                    "http://localhost:3001/authenticate/getuser",
                    {},
                    { headers: { token: context.token } }
                );
                setUsername(resp.data.user);
            }
        }

        getData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="video-item">
            <Link to={`/video/${id}`} className="video-link">
                <img
                    src={thumbnailURL}
                    alt="video_thumbnail"
                    className="video-image"
                />{" "}
                <br />
                {videoData.title} <br />
                <p style={{ fontSize: ".75em" }}>
                    Uploaded by: {videoData.user}{" "}
                </p>
                {videoData.user === username ? (
                    <Link
                        to={`/video/${id}/delete`}
                        className="video-delete-button"
                    >
                        delete
                    </Link>
                ) : (
                    <p> </p>
                )}
            </Link>
        </div>
    );
}

export default VideoItem;
