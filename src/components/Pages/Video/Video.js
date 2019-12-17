import React, {useState} from 'react';
import '../../../style/Video.css';

function Video({match}){
    const [video, setVideo] = useState('');
    const [videoData, setVideoData] = useState({title: null, user: null});
    const videoID = match.params.id;

    const getVideo = async () => {
        console.log(video);
        if(!video) {
            const resp = await fetch(`http://localhost:3001/video/file/${videoID}`);
            setVideo(URL.createObjectURL(await resp.blob()));
        }
    };

    const getVideoData = async () => {
        if(videoData.title == null || videoData.user == null){
            const resp = await fetch(`http://localhost:3001/video/data/${videoID}`);
            const {title, user} = await resp.json();
            setVideoData({title, user});
        }
    };

    getVideo();
    getVideoData();

    return (<div className="video-container">
        <p style={{fontSize: '2em', margin: '0'}}>{videoData.title}</p>
        <p style={{margin: '0'}}>Uploaded by: {videoData.user}</p>
        <video className='video' controls src={video} autoPlay={true}>
        </video>
    </div>)
}

export default Video;