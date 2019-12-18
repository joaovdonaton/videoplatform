import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import MainPage from './components/Pages/Main Page/MainPage';
import Video from './components/Pages/Video/Video';
import Login from './components/Pages/Login/Login';
import ContextState from "./context/Context";
import Register from './components/Pages/Register/Register';
import Upload from './components/Pages/Upload/Upload';

function App() {
    return (
        <ContextState>
            <BrowserRouter>
                <div className="App">
                    <Navbar/>
                    <Switch>
                        <Route exact path='/' component={MainPage}/>
                        <Route exact path='/video/:id' component={Video}/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/register' component={Register}/>
                        <Route exact path='/upload' component={Upload}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </ContextState>
  );
}

export default App;
