import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import CurrentWeather from './views/components/CurrentWeather';
// import CurrentWeather from './views/CurrentWeather';
// import ErrorDisplay from './views/ErrorDisplay';


ReactDOM.render((

    <Router>
        <Route path='/' exact component={CurrentWeather} />
    </Router>

), document.getElementById('root'));

serviceWorker.register();