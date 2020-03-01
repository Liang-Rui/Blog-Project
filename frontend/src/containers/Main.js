import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline';

import TopBar from './TopBar';
import PostListView from './PostListView';
import PostDetailView from './PostDetailView';
import Footer from '../components/Footer'


class Main extends Component {
    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <TopBar />
                <Switch>
                    <Route exact path='/' component={PostListView} />
                    <Route exact path='/:slug' component={PostDetailView} />
                </Switch>
                <Footer />
            </React.Fragment>
        )
    }
}

export default Main;