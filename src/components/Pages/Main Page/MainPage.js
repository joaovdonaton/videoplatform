import React, { useState } from "react";
import "../../../style/MainPage.css";
import VideoItem from "./VideoItem";
import axios from "axios";

function MainPage() {
    const [videoIds, setVideoIds] = useState([]);

    //get ids of all videos in the database
    const getIds = async () => {
        if (videoIds.length === 0) {
            const resp = await axios.get(
                "http://localhost:3001/thumbnail/getids"
            );
            setVideoIds((await resp.data).ids);
        }
    };

    getIds();

    return (
        <div className="container">
            <p style={{ marginTop: "0", fontSize: "1.5em" }}>Videos</p>
            <div className="video-list">
                {videoIds.map(id => {
                    /*create a VideoItem for each video ID from db*/
                    return <VideoItem id={id} key={id} />;
                })}
            </div>
        </div>
    );
}

export default MainPage;
