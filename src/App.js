import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import MainPage from './components/Pages/Main Page/MainPage';
import Video from './components/Pages/Video/Video';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar/>
                <Switch>
                    <Route exact path='/' component={MainPage}/>
                    <Route exact path='/video/:id' component={Video}/>
                </Switch>
            </div>
        </BrowserRouter>
  );
}

export default App;
