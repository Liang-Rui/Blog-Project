import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Hidden from '@material-ui/core/Hidden';
import PostPreview from './PostPreview'


const styles = theme => ({
    recommedPostsCardTop: {
        [theme.breakpoints.up('sm')]: {
            padding: 20,
        },
        [theme.breakpoints.down('sm')]: {
            margin: 10,
            padding: 15,
        },
        '&:hover': {
            boxShadow: `0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)`
        },
    },

})

class TopRecommendedCard extends Component {
    render() {
        const { classes, borderTop, post } = this.props;

        return (
            <Fragment>

                <Grid item xs={12} md={6} container className={classes.recommedPostsCardTop}>
                    <Grid item xs={12}>
                        <PostPreview TopBorder={true} post={post} borderTopColor={borderTop} postImg={post.post_image_url} />
                    </Grid>
                    <Grid item xs={12} style={{ paddingTop: 10 }}>
                        <Hidden smDown>
                            <img style={{ maxWidth: '100%' }} src={post.post_image_url} alt='recommendedCard' />
                        </Hidden>
                    </Grid>
                </Grid>

            </Fragment >
        );
    }
}

export default withStyles(styles, { withTheme: true })(TopRecommendedCard);