import React, {useState} from 'react';
import '../../../style/Video.css';

function Video({match}){
    const [video, setVideo] = useState('');
    const videoID = match.params.id;

    const getVideo = async () => {
        console.log(video);
        if(!video) {
            const resp = await fetch('http://localhost:3001/video/');
            setVideo(URL.createObjectURL(await resp.blob()));
        }
    };

    console.log(video);
    getVideo();

    return (<div className="video-container">
        <p>From User: {'X USER'}</p>
        <p>Title: {'TITLE'}</p>
        <video className='video' controls src={video} autoPlay={true}>
        </video>
    </div>)
}

export default Video;