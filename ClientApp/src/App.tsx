import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import NewSpotter from './components/NewSpotter'

import './custom.css'
import EditSpotter from './components/EditSpotter';
import ViewSpotter from './components/ViewSpotter';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/newSpotter' component={NewSpotter} />
        <Route path='/editSpotter/:recordId?' component={EditSpotter} />
        <Route path='/viewSpotter/:recordId?' component={ViewSpotter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    </Layout>
);
