import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../../style/Navbar.css";
import { Context } from "../../context/Context";
import axios from "axios";

function Navbar() {
    const context = useContext(Context);
    const { token } = context;
    const [username, setUsername] = useState("");

    //get the username of the currently authenticated user
    const getUsername = async () => {
        if (!username) {
            const resp = await axios.post(
                "http://localhost:3001/authenticate/getuser",
                {},
                {
                    headers: {
                        token
                    }
                }
            );
            setUsername(resp.data.user);
        }
    };

    getUsername();

    return (
        <div className="navbar">
            <ul className="navbar-list">
                <li className="navbar-list-item">
                    <Link to="/" className="navbar-link">
                        Video Platform
                    </Link>
                </li>
                {!token ? (
                    <li
                        className="navbar-list-item"
                        style={{
                            fontSize: "1.5em",
                            float: "right",
                            margin: "0 2em"
                        }}
                    >
                        <Link to="/login" className="navbar-link">
                            Login
                        </Link>
                    </li>
                ) : (
                    <li
                        className="navbar-list-item"
                        style={{
                            fontSize: "1.5em",
                            float: "right",
                            margin: "0 2em"
                        }}
                    >
                        <Link to={`/user/${username}`} className="navbar-link">
                            My Channel
                        </Link>
                    </li>
                )}
                <li
                    className="navbar-list-item"
                    style={{
                        fontSize: "1.5em",
                        float: "right",
                        margin: "0 2em"
                    }}
                >
                    <Link to="/upload" className="navbar-link">
                        Upload
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
