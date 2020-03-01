import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog'
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Button from '@material-ui/core/Button'

import MenuIcon from '@material-ui/icons/Menu'
import Folder from '@material-ui/icons/Folder';
import FolderOpen from '@material-ui/icons/FolderOpen';
import Home from '@material-ui/icons/Home';
import ArrowBack from '@material-ui/icons/ArrowBack'
import Contacts from '@material-ui/icons/Contacts'

import { connect } from 'react-redux';
import {
    loadSidebarCategory,
    collapDrawerCategory,
    selectDrawerCategoryArticle,
    toggleDrawer,
    loadProfile,
} from '../actions/index';

import SvgIcon from '../components/SvgIcon'


const styles = theme => ({
    appbarMenuButton: {
        '&:hover': {
            backgroundColor: 'inherit',
            color: 'black'
        }
    },
    appBarMiddleContainer: {
        flexGrow: 1
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.grey['100']}`,
        backgroundColor: '#fafafa',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.05), 0 1px 1px rgba(0, 0, 0, 0.05)'
    },
    logo: {
        width: '9em',
        verticalAlign: 'top',
        paddingTop: 3,
        
    },
    logoButton: {
        '&:hover': {
            backgroundColor: 'inherit',
            opacity: 0.7
        }
    },
    nestedList: {
        paddingLeft: theme.spacing.unit * 4,
    },
    hideDrawerIcon: {
        '&:hover': {
            backgroundColor: 'inherit',
            color: 'black'
        }
    },
    drawerProfileContent: {
        paddingTop: 20,
        paddingLeft: 30,
    },
    drawerProfileCareer: {
        marginTop: `${theme.spacing.unit * 3}px`,
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `0px ${theme.spacing.unit * 2}px 0px ${theme.spacing.unit * 2}px`
    },
    show: {
        transform: 'translate(0, 0)',
        transition: 'transform .5s',
    },
    hide: {
        transform: 'translate(0, -70px)',
        transition: 'transform .5s',
    },
})




class Topbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            wechatDialogOpen: false,
            shouldShow: null,
        }
        this.lastScroll = null;
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this.props.loadSidebarCategory();
        this.props.loadProfile();
        window.addEventListener('scroll', this.handleScroll, { passive: true });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        const lastScroll = window.scrollY;

        if (lastScroll === this.state.lastScroll) {
            return;
        }

        const shouldShow =
            this.lastScroll !== null ? (lastScroll < this.lastScroll || lastScroll === 0) : null;

        if (shouldShow !== this.state.shouldShow) {
            this.setState(prevState => ({
                ...prevState,
                shouldShow,
            }));
        }

        this.lastScroll = lastScroll;
    }

    getScrollClassName() {
        if (this.state.shouldShow === null) {
            return '';
        }

        return this.state.shouldShow
            ? this.props.classes.show
            : this.props.classes.hide;
    }

    handleWechatDialogOpen = () => this.setState({ wechatDialogOpen: true })
    handleWechatDialogClose = () => this.setState({ wechatDialogOpen: false })
    toggleDrawer = () => () => this.props.toggleDrawer()
    handleListCollapse = (item) => () => this.props.collapDrawerCategory(item)
    handleCategoryListSelect = (index) => () => this.props.selectDrawerCategoryArticle(index)
    handleGoHomeButton = () => () => this.props.toggleDrawer()

    render() {
        const {
            classes,
            userProfile,
            drawerCategoryGrouped,
            drawerCategory,
            selectedCategoryIndex,
            leftDrawerOpened
        } = this.props;

        return (
            <Fragment>

                {userProfile.wechat_QR_code !== undefined && userProfile.wechat_QR_code !== '' && (
                    <Dialog open={this.state.wechatDialogOpen} onClose={this.handleWechatDialogClose}>
                        <img src={userProfile.wechat_QR_code} alt='wechatQR' style={{ width: 100 }} />
                    </Dialog>
                )}

                {/* Top app bar begins */}
                <AppBar position="fixed" color="default"
                    className={`${classes.appBar} ${this.getScrollClassName()}`}>
                    <Toolbar>
                        <IconButton onClick={this.toggleDrawer()} className={classes.appbarMenuButton}>
                            <MenuIcon />
                        </IconButton>

                        <div className={classes.appBarMiddleContainer}>
                            <Button component={Link} to={'/'} disableRipple className={classes.logoButton}>
                                <SvgIcon className={classes.logo} name='Logo' width='100px' title='Logo icon' viewBox = "0 0 1153.109 294.725"/>
                            </Button>
                        </div>

                        <Hidden xsDown>
                            {userProfile.github !== undefined && userProfile.github !== '' &&(
                                <a target='_blank' rel="noopener noreferrer" href={userProfile.github}>
                                    <IconButton >
                                        <SvgIcon name='GithubIcon' width='20px' title='GitHub icon' />
                                    </IconButton>
                                </a>
                            )}
                            {userProfile.linkedin !== undefined && userProfile.linkedin !== '' && (
                                <a target='_blank' rel="noopener noreferrer" href={userProfile.linkedin}>
                                    <IconButton >
                                        <SvgIcon name='LinkedinIcon' width='20px' title='LinkedIn icon' />
                                    </IconButton>
                                </a>

                            )}
                            {userProfile.wechat_QR_code !== undefined && userProfile.wechat_QR_code !== '' && (
                                <IconButton onClick={this.handleWechatDialogOpen}>
                                    <SvgIcon name='WeChatIcon' width='20px' title='WeChat icon' />
                                </IconButton>
                            )}
                        </Hidden>
                        
                    </Toolbar>
                </AppBar>
                {/* Top app bar ends */}


                {/* Left drawer begins */}
                <Drawer open={leftDrawerOpened} onClose={this.toggleDrawer()}>
                    <List>
                        <ListItem>
                            <ListItemSecondaryAction>
                                <IconButton aria-label="hide-drawer" className={classes.hideDrawerIcon} onClick={this.toggleDrawer()}>
                                    <ArrowBack fontSize="small" />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>


                        {/* UserProfile begins */}
                        {Object.keys(userProfile).length !== 0 && (
                            <div className={classes.drawerProfileContent}>
                                <Typography variant='h5' style={{ fontWeight: 600 }}>
                                    {userProfile.firstName === undefined ? '' : userProfile.firstName}
                                </Typography>
                                <Typography variant='h6'>
                                    {userProfile.lastName === undefined ? '' : userProfile.lastName}.
                                </Typography>
                                <div className={classes.drawerProfileCareer}>
                                    <Typography variant='caption' gutterBottom>
                                        {userProfile.jobDescription_1 === undefined ? '' : userProfile.jobDescription_1}
                                    </Typography>
                                    <Typography variant='caption' gutterBottom>
                                        {userProfile.jobDescription_2 === undefined ? '' : userProfile.jobDescription_2}
                                    </Typography>
                                    <Typography variant='caption' gutterBottom>
                                        {userProfile.jobDescription_3 === undefined ? '' : userProfile.jobDescription_3}
                                    </Typography>
                                </div>
                                <div style={{ paddingTop: 20, paddingBottom: 20 }}>
                                    <Typography variant='caption' gutterBottom>
                                        Email: {userProfile.email === undefined ? '' : userProfile.email}
                                    </Typography>
                                    <Typography variant='caption' gutterBottom>
                                        Phone: {userProfile.phone_1 === undefined ? '' : userProfile.phone_1}
                                    </Typography>
                                    {userProfile.phone_2 !== '' && (
                                        <Typography variant='caption' gutterBottom>
                                            Or: {userProfile.phone_2}
                                        </Typography>
                                    )}
                                </div>

                            </div>
                        )}

                        <Hidden smUp>
                            <ListItem style={{paddingTop: 0}}>
                                <ListItemIcon>
                                    <Contacts />
                                </ListItemIcon>

                                <Grid container alignContent='space-between'>
                                    {userProfile.github !== undefined && userProfile.github !== '' &&(
                                        <Grid item xs style={{textAlign:'center'}}>
                                            <a target='_blank' rel="noopener noreferrer" href={userProfile.github}>
                                                <IconButton >
                                                    <SvgIcon name='GithubIcon' width='20px' title='GitHub icon' />
                                                </IconButton>
                                            </a>
                                        </Grid>
                                    )}
                                    {userProfile.linkedin !== undefined && userProfile.linkedin !== '' && (
                                        <Grid item xs style={{textAlign:'center'}}> 
                                            <a target='_blank' rel="noopener noreferrer" href={userProfile.linkedin}>
                                                <IconButton >
                                                    <SvgIcon name='LinkedinIcon' width='20px' title='LinkedIn icon' />
                                                </IconButton>
                                            </a>
                                        </Grid>
                                    )}
                                    {userProfile.wechat_QR_code !== undefined && userProfile.wechat_QR_code !== '' && (
                                        <Grid item xs style={{textAlign:'center'}}>
                                            <IconButton onClick={this.handleWechatDialogOpen}>
                                                <SvgIcon name='WeChatIcon' width='20px' title='WeChat icon' />
                                            </IconButton>
                                        </Grid>
                                    )}
                                </Grid>
                            </ListItem>
                        </Hidden>
                        

                        <Divider />
                        {/* UserProfile ends */}


                        <ListItem button component={Link} to={'/'} style={{ marginTop: 15 }} onClick={this.handleGoHomeButton()}>
                            <ListItemIcon>
                                <Home />
                            </ListItemIcon>
                            <ListItemText inset primary='HOME' />
                        </ListItem>

                        <ListItem style={{ marginTop: 15, paddingBottom: 0 }}>
                            <ListItemText primary='Archive' style={{ borderLeft: '2px solid', paddingLeft: 15, borderLeftColor: 'lightgrey' }} />
                        </ListItem>




                        {/* Post category list begins */}
                        <div style={{ paddingTop: 20 }}>
                            {Object.keys(drawerCategoryGrouped).sort().map((key, index) => (
                                <div key={key + index}>
                                    <ListItem button onClick={this.handleListCollapse(key)}>
                                        <ListItemIcon>
                                            {drawerCategory[key] !== undefined && drawerCategory[key] ? <FolderOpen /> : <Folder />}
                                        </ListItemIcon>
                                        <ListItemText inset primary={key} />
                                    </ListItem>
                                    <Collapse in={drawerCategory[key]}>
                                        <List component='div' disablePadding>
                                            {drawerCategoryGrouped[key].sort((a, b) => {
                                                const titleA = a.title.toUpperCase()
                                                const titleB = b.title.toUpperCase()
                                                if (titleA < titleB) {
                                                    return -1
                                                }
                                                if (titleA > titleB) {
                                                    return 1
                                                }
                                                return 0
                                            }).map((item, idx) => (
                                                <ListItem button
                                                    className={classes.nestedList}
                                                    key={item['slug'] + idx}
                                                    component={Link}
                                                    to={'/' + item['slug']}
                                                    selected={selectedCategoryIndex === item['slug']}
                                                    onClick={this.handleCategoryListSelect(item['slug'])} >
                                                    <ListItemText inset secondary={item['title']} style={{ maxWidth: 300 }} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Collapse>
                                </div>
                            ))}
                            {/* Post category list ends */}
                        </div>


                    </List>
                </Drawer>
                {/* Left drawer ends */}
            </Fragment>

        )
    }
}


const mapStateToProps = state => ({
    userProfile: state.userProfile,
    drawerCategoryGrouped: state.leftDrawer.drawerCategoryGrouped,
    drawerCategory: state.leftDrawer.drawerCategory,
    selectedCategoryIndex: state.leftDrawer.selectedCategoryIndex,
    leftDrawerOpened: state.leftDrawer.leftDrawerOpened
})

const mapDispatchToProps = {
    loadProfile,
    loadSidebarCategory,
    collapDrawerCategory,
    selectDrawerCategoryArticle,
    toggleDrawer,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Topbar));
