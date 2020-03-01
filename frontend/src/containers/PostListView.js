import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles';


import RecommendedPostSection from './RecommendedPostSection';
import PostListSection from './PostListSection';
import { saveScrollPosition, resetCategorySelectPost } from '../actions/index'

const styles = theme => ({
    root: {
        maxWidth: 1000,
        margin: '0 auto',
        marginTop: 100,
        [theme.breakpoints.down('sm')]: {
            maxWidth: 1000,
            margin: '0 auto',
            marginTop: 60
        },
        [theme.breakpoints.down('xs')]: {
            maxWidth: 1000,
            margin: '0 auto',
            marginTop: 50
        }
    },
})


class PostListView extends Component {

    componentDidMount() {
        this.props.resetCategorySelectPost()
    }

    componentWillUnmount() {
        this.props.saveScrollPosition(this.props.location.pathname, { scrollX: window.scrollX, scrollY: window.scrollY })
    }

    render() {
        const { classes } = this.props
        return (
            <Grid container className={classes.root}>
                <RecommendedPostSection />
                <Grid item xs={12} style={{ padding: 30 }}></Grid>
                <PostListSection />
            </Grid>
        )
    }
}


const mapDispatchToProps = {
    saveScrollPosition,
    resetCategorySelectPost
};


export default connect(null, mapDispatchToProps)(withStyles(styles, { withTheme: true })(PostListView))