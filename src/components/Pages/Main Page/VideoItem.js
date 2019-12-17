import React, {useState} from 'react';
import '../../../style/VideoItem.css';
import {Link} from 'react-router-dom';

function VideoItem({id}){
    const [thumbnailURL, setThumbnailURL] = useState('');
    const [videoData, setVideoData] = useState({title: null, user: null});

    const getThumbnail = async () => {
        if(!thumbnailURL) {
            const resp = await fetch(`http://localhost:3001/thumbnail/getthumb/${id}`);
            setThumbnailURL(URL.createObjectURL(await resp.blob()));
        }
    };

    const getVideoData = async () => {
        if(videoData.title == null || videoData.user == null){
            const resp = await fetch(`http://localhost:3001/video/data/${id}`);
            const {title, user} = await resp.json();
            setVideoData({title, user});
        }
    };

    getThumbnail();
    getVideoData();

    return (
        <div className='video-item'>
            <Link to={`/video/${id}`} className='video-link'>
                <img src={thumbnailURL} alt='video_thumbnail' className='video-image'/> <br/>
                {videoData.title} <br/>
                <p style={{fontSize: '.75em'}}>Uploaded by: {videoData.user} </p>
            </Link>
        </div>
    )
}

export default VideoItem;