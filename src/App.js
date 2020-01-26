import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import MainPage from './components/Pages/Main Page/MainPage';
import Video from './components/Pages/Video/Video';
import Login from './components/Pages/Login/Login';
import ContextState from "./context/Context";
import Register from './components/Pages/Register/Register';
import Upload from './components/Pages/Upload/Upload';
import User from './components/Pages/User/User';
import Delete from './components/Pages/Video/Delete';
import Search from './components/Pages/Search/Search';

/*
TODO:
- [X] Video descriptions
- [X] Search bar
- [ ] Comment section 
- [ ] A visual overhaul of the Video page 
- [ ] Create a color scheme for the whole web app
- [ ] Playlists 
- [ ] Favorite videos
- [ ] Video view counter
- [ ] Better channel page (profile picture, bio, most viewed videos)

(investigate memory leak warning on search component)
*/

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
                        <Route exact path='/user/:id' component={User}/>
                        <Route exact path='/video/:id/delete' component={Delete}/>
                        <Route exact path='/search' component={Search}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </ContextState>
  );
}

export default App;
