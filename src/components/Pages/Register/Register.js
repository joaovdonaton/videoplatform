import React, { useState } from "react";
import "../../../style/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    //update text fields and state
    const onChange = e => {
        e.target.type === "text"
            ? setUsername(e.target.value)
            : setPassword(e.target.value);
    };

    //try to create an account, if the backend returns resp.data.error
    //show the error message
    const onCreate = async e => {
        e.preventDefault();
        const resp = await axios.post("http://localhost:3001/register/", {
            username,
            password
        });
        if (resp.data.error) {
            setError(resp.data.error);
        } else {
            setSuccess(true);
        }
    };

    return (
        <div className="login-container">
            {!success ? (
                <div>
                    <form style={{ marginBottom: "1em" }}>
                        <label className="login-label">
                            Create a new account
                        </label>{" "}
                        <br />
                        {!error ? <p> </p> : <p>{error}</p>}
                        <input
                            type="text"
                            placeholder="Enter username"
                            className="login-input"
                            value={username}
                            onChange={onChange}
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="login-input"
                            value={password}
                            onChange={onChange}
                        />
                        <br />
                        <Link
                            className="login-button"
                            onClick={onCreate}
                            to="/"
                        >
                            Create Account
                        </Link>
                    </form>
                    <Link to="/login" className="login-link">
                        Already have an account?
                    </Link>
                </div>
            ) : (
                <p style={{ fontSize: "2em" }}>Account successfully created</p>
            )}
        </div>
    );
}

export default Register;
