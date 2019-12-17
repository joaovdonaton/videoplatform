import React from 'react';
import '../../../style/VideoItem.css';
import {Link} from 'react-router-dom';

function VideoItem({thumb, id}){
    return (
        <div className='video-item'>
            <Link to={`/video/${id}`} className='video-link'>
                <img src={thumb} alt='video_thumbnail' className='video-image'/> <br/>
                Epic steam video release boom <br/>
                <p style={{fontSize: '.75em'}}>From: USER </p>
            </Link>
        </div>
    )
}

export default VideoItem;