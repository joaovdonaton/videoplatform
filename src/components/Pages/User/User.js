import React, {useState} from 'react';
import VideoItem from "../Main Page/VideoItem";
import axios from 'axios';

function User({match}){
    const user = match.params.id;
    const [videoIds, setVideoIds] = useState([]);

    //get list of video ids uploaded by a certain user
    const getIds = async () => {
        if(videoIds.length === 0) {
            const resp = await axios.get(`http://localhost:3001/thumbnail/getuserthumbs/${user}`);
            setVideoIds(resp.data.ids);
        }
    };

    getIds();

    //create a list of video items just like in the main page
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