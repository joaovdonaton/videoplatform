import React from 'react';
import '../../../style/MainPage.css';
import sample1 from '../../../images/sample thumbnails/sample1.png';
import sample2 from '../../../images/sample thumbnails/sample2.png';
import sample3 from '../../../images/sample thumbnails/sample3.png';
import VideoItem from "./VideoItem";

function MainPage(){
    return (<div className='container'>
        <p style={{marginTop: '0', fontSize: '1.5em'}}>Newest Videos</p>
        <div className='video-list'>
            <VideoItem thumb={sample1}/>
            <VideoItem thumb={sample2}/>
            <VideoItem thumb={sample3}/>
        </div>
    </div>)
}

export default MainPage;