import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TopRecommendedCard from '../components/TopRecommendedCard';
import RecommendedCard from '../components/RecommendedCard';
import NavTitle from '../components/NavTitle'
import LoadingBounce from '../components/LoadingBounce'


import { connect } from 'react-redux';
import { loadRecommendPost, loadTopRecommendPost } from '../actions/index';

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

const Color = {
    1: "#88ACB8",
    2: "#757AA7",
    3: "#94686f",
    4: "#99d299",
    5: "#bdb76b",
    6: "#a2a2d7",
    7: "#868f77",
    8: "#b2dab2",
    9: "#808000",
    10: "#a48da4",
}


class RecommendedPostSection extends Component {

    handleLoadMoreRecommendedPost = () => {
        this.props.loadRecommendPost('force')
    }


    componentWillMount() {
        this.props.loadRecommendPost()
        this.props.loadTopRecommendPost()
    }


    render() {
        const {
            classes,
            recommendedPostList,
            topRecommendedPost,
            nextRecommendedPost,
            loadingRecommendedPost
        } = this.props;

        return (

            <Fragment>
                {/* recommended post title starts */}
                <Grid item xs={12} md={2} className={classes.navTitle}>
                    <NavTitle title='Recommended Reading' />
                </Grid>
                {/* recommended post title ends */}

                <Grid item md={1} className={classes.navTitlePaddingRight}></Grid>

                <Grid item xs={12} md={9} container>

                    {/* Top recommended post */}
                    {Object.keys(topRecommendedPost).length !== 0 && <TopRecommendedCard topRecommendedPost={topRecommendedPost} />}

                    {/* Recommended post */}
                    {recommendedPostList.map((item, index) => {
                        if (index % 2) {
                            return (<RecommendedCard direction='right' borderTop={'4px solid ' + Color[(index + 1) % 10]} post={item} key={item.slug} />)
                        } else {
                            return (<RecommendedCard direction='left' borderTop={'4px solid ' + Color[(index + 1) % 10]} post={item} key={item.slug} />)
                        }
                    })}


                    {loadingRecommendedPost && (
                        <Grid item xs={12} container style={{ paddingTop: 10 }}>
                            <LoadingBounce />
                        </Grid>
                    )}


                    {(nextRecommendedPost === null || loadingRecommendedPost) ? <div></div> : (
                        <Grid item xs={12} container className={classes.loadMoreButtonContainer}>
                            <Button className={classes.loadMoreButton} onClick={this.handleLoadMoreRecommendedPost}>Load More...</Button>
                        </Grid>
                    )}

                </Grid>
            </Fragment>

        );
    }

}



const mapStateToProps = state => ({
    recommendedPostList: state.recommendPostView.items,
    loadingRecommendedPost: state.recommendPostView.isFetching,
    nextRecommendedPost: state.recommendPostView.nextPageUrl,
    topRecommendedPost: state.topRecommendPost
})

const mapDispatchToProps = {
    loadTopRecommendPost,
    loadRecommendPost
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(RecommendedPostSection));
