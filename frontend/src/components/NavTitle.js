import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { loadPosts } from '../actions/index';


const styles = theme => ({
    postListTitle: {
        marginTop: 20,
        paddingBottom: 10,
        borderTop: '3px solid black',
        [theme.breakpoints.up('md')]: {
            textAlign: 'right',
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: 5,
            paddingLeft: 10
        },
    },
    sortingSectionDivider: {
        borderTop: 'none',
        marginLeft: 90,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            width: 80
        },
    },
    sortingSectionItem: {
        '&:hover': {
            color: 'black',
            cursor: 'pointer'
        }
    }
});

const orderMapping = {
    '-timestamp': 'New',
    'timestamp': 'Old',
    'hit_count': 'Pageview' // django order_by() genericRelation bugs, if we want to order by descending order, we don't need '-' sign
}

class NavTitle extends Component {

    handleOrderingChange = (ordering) => () => this.props.loadPosts(ordering)


    render() {
        const { title, classes, postListSorting, currentOrdering } = this.props
        return (
            <div className={classes.postListTitle}>
                <Typography variant={'h6'}>
                    {title}
                </Typography>
                {(postListSorting && currentOrdering !== null) && (
                    <div style={{ fontStyle: 'italic', paddingTop: 10 }}>
                        <Typography variant='subtitle2' color='textSecondary' >
                            sorted by <span style={{ color: '#50a14f', fontWeight: 'bold' }}>{orderMapping[currentOrdering].toLowerCase()}</span>
                        </Typography>

                        <hr className={classes.sortingSectionDivider} />

                        {Object.keys(orderMapping).map((item, index) => (
                            item !== currentOrdering && (
                                <Typography key={item + index} variant='subtitle2' color='textSecondary' className={classes.sortingSectionItem} onClick={this.handleOrderingChange(item)}>
                                    {orderMapping[item]}
                                </Typography>
                            )
                        ))}
                    </div>
                )}

            </div>
        )
    }
}



const mapStateToProps = state => ({
    currentOrdering: state.postListView.currentOrdering
})

const mapDispatchToProps = {
    loadPosts,
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(NavTitle));