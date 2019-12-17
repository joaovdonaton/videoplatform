import React, {useState} from 'react';
import '../../../style/VideoItem.css';
import {Link} from 'react-router-dom';

function VideoItem({id}){
    const [thumbnailURL, setThumbnailURL] = useState('');

    const getThumbnail = async () => {
        if(!thumbnailURL) {
            const resp = await fetch(`http://localhost:3001/thumbnail/getthumb/${id}`);
            setThumbnailURL(URL.createObjectURL(await resp.blob()));
        }
    };

    getThumbnail();

    return (
        <div className='video-item'>
            <Link to={`/video/${id}`} className='video-link'>
                <img src={thumbnailURL} alt='video_thumbnail' className='video-image'/> <br/>
                Epic steam video release boom <br/>
                <p style={{fontSize: '.75em'}}>From: USER </p>
            </Link>
        </div>
    )
}

export default VideoItem;