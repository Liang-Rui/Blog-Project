import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import PostCard from '../components/PostCard'
import NavTitle from '../components/NavTitle'
import LoadingBounce from '../components/LoadingBounce'

import { connect } from 'react-redux';
import { loadPosts, loadMorePost } from '../actions/index';


const styles = theme => ({
    loadMoreButtonContainer: {
        paddingTop: 20,
        paddingLeft: 15
    },
    loadMoreButton: {
        color: '#5f9b65',
        '&:hover': {
            backgroundColor: 'white',
            opacity: '0.6'
        }
    },
    navTitle: {
        [theme.breakpoints.up('md')]: {
            paddingLeft: 30
        },
    },
    navTitlePaddingRight: {
        [theme.breakpoints.down('md')]: {
            maxWidth: 35
        },
    }
})

class PostListSection extends Component {

    componentWillMount() {
        if (this.props.postList.length === 0) {
            this.props.loadPosts('-timestamp');
        }
    }

    handleLoadMorePost = () => {
        this.props.loadMorePost();
    }


    render() {
        const { classes, loadingPost, postList, nextPost } = this.props;

        return (

            <Fragment>


                {/* post title start */}
                <Grid item xs={12} md={2} className={classes.navTitle}>
                    <NavTitle title='Current Posts' postListSorting={true} />
                </Grid>
                {/* post title ends */}

                <Grid item md={1} className={classes.navTitlePaddingRight}></Grid>

                {/* post list starts */}
                <Grid item xs={12} md={9} container>


                    {postList.length > 0 && postList.map((post, index) => {
                        return (
                            <PostCard post={post} index={index} key={post.slug} />
                        );
                    })}

                    <Grid item xs={12} container style={{ paddingTop: 10 }}>
                        {loadingPost && <LoadingBounce />}
                    </Grid>


                    {(nextPost === null || loadingPost) ? <div></div> : (
                        <Grid item xs={12} container className={classes.loadMoreButtonContainer}>
                            <Button className={classes.loadMoreButton} onClick={this.handleLoadMorePost}>Load More...</Button>
                        </Grid>
                    )}


                </Grid>
                {/* post list ends */}


            </Fragment>

        );
    }

}

const mapStateToProps = state => ({
    postList: state.postListView.items,
    loadingPost: state.postListView.isFetching,
    nextPost: state.postListView.nextPageUrl,
    currentOrdering: state.postListView.currentOrdering
})

const mapDispatchToProps = {
    loadPosts,
    loadMorePost
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(PostListSection));
