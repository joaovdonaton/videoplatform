import React from 'react';
import '../../../style/VideoItem.css';

function VideoItem({thumb}){
    return (
        <div className='video-item'>
            <a href='/' className='video-link'>
                <img src={thumb} alt='video_thumbnail' className='video-image'/> <br/>
                Epic steam video release boom <br/>
                <p style={{fontSize: '.75em'}}>From: USER </p>
            </a>
        </div>
    )
}

export default VideoItem;