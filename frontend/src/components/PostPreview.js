import React, { Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PostSubtitle from './PostSubtitle'
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';


const styles = theme => ({
    postTitle: {
        paddingTop: 5,
        fontSize: 20,
        [theme.breakpoints.down('sm')]: {
            fontSize: 18
        },

    },
    titleLink: {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            opacity: 0.6
        }
    }
})

const PostPreview = ({ classes, TopBorder, post, borderTopColor }) => {
    return (
        <Fragment>
            <div style={TopBorder ? { borderTop: borderTopColor } : {}}>
                <Typography component="h5" variant="h5" className={classes.postTitle} style={{ paddingTop: 5 }}>
                    <Link to={'/' + post.slug} className={classes.titleLink}>{post.title}</Link>
                </Typography>
                <PostSubtitle timestamp={post.timestamp} category={post.category} />
            </div>

            <Typography variant={'body2'}>
                {post.content_preview}
            </Typography>
        </Fragment>
    )
}

export default withStyles(styles, { withTheme: true })(PostPreview);