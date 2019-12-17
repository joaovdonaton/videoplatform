import React from 'react';
import {Link} from 'react-router-dom';
import '../../style/Navbar.css';

function Navbar(){
    return (<div className="navbar">
        <ul className="navbar-list">
            <li className="navbar-list-item">
                <Link to='/' className='navbar-link'>Video Platform</Link>
            </li>
            <li className="navbar-list-item" style={{fontSize: '1.5em', float: 'right', margin: '0 2em'}}>
                <Link to='/login' className='navbar-link'>Login</Link>
            </li>
        </ul>
    </div>)
}

export default Navbar;