import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden'
import withStyles from '@material-ui/core/styles/withStyles';
import PostPreview from './PostPreview'


const styles = theme => ({
    recommedPostsCardTop: {
        [theme.breakpoints.up('sm')]: {
            padding: 20,
            // marginLeft: 30
        },
        // [theme.breakpoints.only('md')]: {
        //     maxWidth: '94%'
        // },
        [theme.breakpoints.down('sm')]: {
            margin: 10,
            padding: 15,
        },
        '&:hover': {
            boxShadow: `0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)`
        },
    },
    firstRecommendedPostContent: {
        [theme.breakpoints.up('md')]: {
            paddingLeft: 20
        }
    },
});

class TopRecommendedCard extends Component {
    render() {
        const { topRecommendedPost, classes } = this.props;

        return (
            <Fragment>

                <Grid item xs={12} container className={classes.recommedPostsCardTop}>
                    <Hidden smDown>
                        <Grid item xs={12} md={6}>
                            <img style={{ maxWidth: '100%' }} src={topRecommendedPost.post_image_url} alt='topRecommendedCard' />
                        </Grid>
                    </Hidden>
                    <Grid item xs={12} md={6} className={classes.firstRecommendedPostContent}>

                        <PostPreview TopBorder={true} post={topRecommendedPost} borderTopColor='4px solid rgb(177, 212, 180)' postImg={topRecommendedPost.post_image_url} />

                    </Grid>
                </Grid>

            </Fragment >
        );
    }
}

export default withStyles(styles, { withTheme: true })(TopRecommendedCard);