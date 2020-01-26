import React, { useState, useEffect } from "react";
import axios from 'axios';
import VideoItem from '../Main Page/VideoItem';

export default () => {
    const [searchText, setSearchText] = useState("");
    const [ids, setIds] = useState([]);

    const onChange = (e) => {
        e.preventDefault();
        setSearchText(e.target.value)
    }

    useEffect(() => {
        async function makeSearch(){
            if(searchText){
                const resp = await axios.post(`http://localhost:3001/thumbnail/search/${searchText}`);
                setIds(resp.data.ids)
            }
            else{
                setIds([])
            }
        }

        makeSearch()
    }, [searchText]);

    return (
        <div className="container" style={{ textAlign: "center" }}>
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchText}
                    onChange={onChange}
                    style={{ fontSize: "2em", width: "40%" }}
                ></input>
            </form>
            <div className='video-list'>
                {ids.map(id => <VideoItem id={id} key={id}/>)}
            </div>
        </div>
    );
};
