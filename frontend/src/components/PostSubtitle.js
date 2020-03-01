import React from 'react'

import FolderOpen from '@material-ui/icons/FolderOpen'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles';

import { timestampToDate } from '../utils/helper'

import { connect } from 'react-redux';
import { selectOneCategoryFromDrawer } from '../actions/index';


const styles = {
    categorySpan: {
        '&:hover': {
            fontWeight: 'bold',
            cursor: 'pointer',
            textDecoration: 'underline'
        }
    },
    folderOpen: {
        fontSize: 15,
        verticalAlign: 'text-top',
        marginRight: 8
    },
    verticalBar: {
        paddingLeft: 5,
        paddingRight: 5
    }
}

class PostSubtitle extends React.Component {
    handleCategoryOnclick = (category) => () => {
        this.props.selectOneCategoryFromDrawer(category)
    }
    render() {
        const { classes, timestamp, category } = this.props
        return (
            <Typography variant="subtitle2" color="textSecondary" style={{ paddingBottom: 10 }}>
                Posted on {timestampToDate(timestamp)} <span className={classes.verticalBar}>|</span> <FolderOpen className={classes.folderOpen} /><span onClick={this.handleCategoryOnclick(category)} className={classes.categorySpan}>{category}</span>
            </Typography>
        )
    }
}



const mapDispatchToProps = {
    selectOneCategoryFromDrawer
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(PostSubtitle));