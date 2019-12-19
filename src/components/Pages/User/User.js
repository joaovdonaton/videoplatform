import React, {useState} from 'react';
import VideoItem from "../Main Page/VideoItem";
import axios from 'axios';

function User({match}){
    const user = match.params.id;
    const [videoIds, setVideoIds] = useState([]);

    const getIds = async () => {
        if(videoIds.length === 0) {
            const resp = await axios.get(`http://localhost:3001/thumbnail/getuserthumbs/${user}`);
            setVideoIds(resp.data.ids);
        }
    };

    getIds();

    return <div className='container'>
        <p style={{marginTop: '0', fontSize: '1.5em'}}>Videos uploaded by {user}</p>
        <div className='video-list'>
            {videoIds.map(id => {
                return <VideoItem id={id} key={id}/>;
            })}
        </div>
    </div>
}

export default User;