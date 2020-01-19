import React, {useState, useContext} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Context} from '../../../context/Context';

function Delete({match}){
    const [videoTitle, setVideoTitle] = useState(null);
    const [deleteResult, setDeleteResult] = useState('');
    const padding = {padding: '0.5em 1.5em'};
    const id = match.params.id;
    const context = useContext(Context);

    //get video title
    const getVideoData = async () => {
        if(videoTitle == null){
            const resp = await fetch(`http://localhost:3001/video/data/${id}`);
            const {title} = await resp.json();
            setVideoTitle(title);
        }
    };

    getVideoData();

    //send request to delete video
    const deleteVideo = async () => {
        if(!deleteResult){
            const resp = await axios.post(`http://localhost:3001/video/delete/${id}`, {},
                {headers: {token: context.token}});
            setDeleteResult(resp.data.msg);
        }
    };

    return <div className='container'>
        {deleteResult ? <p>{deleteResult}</p>: <div>
        <h1 style={{fontSize: '1.75em'}}>Are you sure you would like to delete this video?</h1>
        <p>This action is permanent and can not be undone</p>
        <p>Video title: <b>{videoTitle}</b></p>
        <p>Video ID: <b>{id}</b></p>
        <button className='upload-button' style={padding} onClick={deleteVideo}>Yes</button>
        <Link to={`/video/${id}`} className='upload-button' style={padding}>No</Link> </div>}
    </div>
}

export default Delete;