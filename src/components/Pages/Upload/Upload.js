import React, {useState, useContext} from 'react';
import '../../../style/Upload.css';
import '../../../style/Login.css';
import axios from 'axios';
import {Context} from '../../../context/Context';

function Upload(){
    const [selectedVideo, setSelectedVideo] = useState('');
    const [selectedThumbnail, setSelectedThumbnail] = useState('');
    const context = useContext(Context);

    const onChange = (e) => {
        switch (e.target.name){
            case 'video':
                setSelectedVideo(e.target.files[0]);
                break;
            case 'thumbnail':
                setSelectedThumbnail(e.target.files[0]);
                break;
            default:
                break;
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        let videoFormData = new FormData();
        videoFormData.append('video', selectedVideo);
        videoFormData.append('thumbnail', selectedThumbnail);

        const videoResp = await axios.post(
            'http://localhost:3001/video/upload', videoFormData, {headers: {
            token: context.token
            }});
    };

    return <div className='container'>
        <form onSubmit={onSubmit}>
            <label htmlFor='select-video' className='upload-button'>Select Video File (MP4)</label>
            <input id='select-video' type='file' name='video' onChange={onChange}/>
            <label>Currently selected video file: <b>{selectedVideo.name}</b></label>
            <br/>
            <label htmlFor='select-thumbnail' className='upload-button'>Select Image File (JPG)</label>
            <input id='select-thumbnail' type='file' name='thumbnail' onChange={onChange}/>
            <label>Currently selected thumbnail: <b>{selectedThumbnail.name}</b></label>
            <br/>
            <button type='submit' className='upload-button'>Upload Video</button>
        </form>
    </div>
}

export default Upload;