import React, {useState, useContext} from 'react';
import '../../../style/Login.css';
import axios from 'axios';
import {Context} from '../../../context/Context';
import {Link} from 'react-router-dom';

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const context = useContext(Context);
    const {setToken, token} = context;

    const onChange = (e) => {
        e.target.type === 'text' ? setUsername(e.target.value) : setPassword(e.target.value);
    };

    const onLogin = async (e) => {
        e.preventDefault();
        const resp = await axios.post('http://localhost:3001/authenticate/generatejwt',
            {username, password});
        resp.data.error === undefined ? setToken(resp.data.jwt) : setError(resp.data.error);
    };

    return <div className='login-container'>
        {!token ?
            <div>
        <form style={{marginBottom: '1em'}}>
            <label className='login-label'>Log in to your account</label> <br/>
            {!error ? <p> </p>: <p>{error}</p>}
            <input type='text' placeholder='Enter username' className='login-input' value={username}
            onChange={onChange}/>
            <br/>
            <input type='password' placeholder='Enter password' className='login-input' value={password}
            onChange={onChange}/>
            <br/>
            <Link className='login-button' onClick={onLogin} to='/'>Login</Link>
        </form> <Link to='/register' className='login-link'>Don't have an account yet?</Link></div>
            :
        <p style={{fontSize: '2em'}}>You are already logged in</p>
        }
    </div>
}

export default Login;