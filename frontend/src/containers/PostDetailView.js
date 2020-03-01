import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';

import { connect } from 'react-redux';
import {
    loadPostDetail,
    savePostToc,
    saveScrollPosition,
    selectDrawerCategoryArticle,
    savePostHeaderList
} from '../actions/index';

import PostSubtitle from '../components/PostSubtitle'
import LoadingBounce from '../components/LoadingBounce'

import $ from 'jquery'

const Prism = require('prismjs')
require('prismjs/components/prism-python')
require('prismjs/components/prism-bash')
require('prismjs/components/prism-c')
require('prismjs/components/prism-cpp')
require('prismjs/components/prism-css')
require('prismjs/components/prism-c')
require('prismjs/components/prism-diff')
require('prismjs/components/prism-django')
require('prismjs/components/prism-git')
require('prismjs/components/prism-java')
require('prismjs/components/prism-javascript')
require('prismjs/components/prism-json')
require('prismjs/components/prism-jsx')
require('prismjs/components/prism-latex')
require('prismjs/components/prism-makefile')
require('prismjs/components/prism-markdown')
require('prismjs/components/prism-nginx')
require('prismjs/components/prism-perl')
require('prismjs/components/prism-sql')
require('prismjs/components/prism-plsql')
require('prismjs/components/prism-prolog')
require('prismjs/components/prism-r')
require('prismjs/components/prism-typescript')
require('prismjs/components/prism-markup-templating')
require('prismjs/components/prism-markup')
require('prismjs/components/prism-tsx')

var md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
        let hl
        if (lang && Prism.languages[lang]) {
            try {
                hl = Prism.highlight(str, Prism.languages[lang])
            } catch (error) {
                console.error(error)
                hl = md.utils.escapeHtml(str)
            }
        }
        return `<pre class="language-${lang}"><code class="language-${lang}">${hl}</code></pre>`
    }
}).use(require("markdown-it-anchor"), { permalink: true, permalinkBefore: true, permalinkSymbol: '§' })
    .use(require("markdown-it-toc-done-right"), { listType: 'ul' });


const styles = theme => ({
    root: {
        marginTop: 120,
        [theme.breakpoints.down('sm')]: {
            marginTop: 90
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: 80
        }
    },
    postDetailContainer: {
        maxWidth: 1800,
        margin: '0 auto',
    },
    tocSide: {
        [theme.breakpoints.down('sm')]: {
            height: 'auto'
        },
    },
    postContent: {
        padding: 30
    },
    postDetailTitle: {
        [theme.breakpoints.only('sm')]: {
            fontSize: '1.9rem'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.7rem'
        },
    }
})

class PostDetailView extends Component {
    constructor(props) {
        super(props)
        this.postContent = React.createRef()
        this.state = {
            currentSection: null
        }
        this.handleTocChangeOnscroll = this.handleTocChangeOnscroll.bind(this)
        this.updateHeaderList = this.updateHeaderList.bind(this)
    }

    componentDidMount() {
        this.props.loadPostDetail(this.props.slug)
        this.props.selectDrawerCategoryArticle(this.props.slug)
        window.addEventListener('scroll', this.handleTocChangeOnscroll, { passive: true })
        window.addEventListener('resize', this.updateHeaderList, { passive: true })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.slug !== this.props.slug) {
            this.props.saveScrollPosition(prevProps.location.pathname, { scrollX: window.scrollX, scrollY: window.scrollY })
            this.props.loadPostDetail(this.props.slug)
        }

        if (this.props.currentPostDetail !== null && this.postContent.current !== null) {
            if (this.props.currentPostDetail.headerPositionList.length === 0) {
                this.props.savePostHeaderList(this.props.slug, this.getPostContentHeaderPositionList())
            }
            if (this.props.currentPostDetail.toc === null) {
                this.props.savePostToc(this.props.slug, this.postContent.current.childNodes[0].innerHTML)
            }
        }
    }


    componentWillUnmount() {
        this.props.saveScrollPosition(this.props.location.pathname, { scrollX: window.scrollX, scrollY: window.scrollY })
        window.removeEventListener('scroll', this.handleTocChangeOnscroll);
        window.removeEventListener('resize', this.updateHeaderList)
    }


    updateHeaderList() {
        this.props.savePostHeaderList(this.props.slug, this.getPostContentHeaderPositionList())
    }

    getPostContentHeaderPositionList() {
        const headers = $('.postDetailContent h1,.postDetailContent h2,.postDetailContent h3,.postDetailContent h4,.postDetailContent h5,.postDetailContent h6');
        var headerPositionList = []

        headers.each((index, element) => {
            const id = $(element).attr('id')
            if (id !== undefined) {
                const position = $(element).offset().top
                headerPositionList.push({ 'id': id, 'scrollY': position })
            }
        })
        return headerPositionList
    }

    handleTocChangeOnscroll() {
        if (this.props.currentPostDetail !== null) {
            const headerList = this.props.currentPostDetail.headerPositionList
            const currentPosition = window.scrollY
            var shouldChangeCurrentSection = false
            var sectionId = null

            for (var i = 0; i < headerList.length; i++) {
                if (currentPosition > headerList[i].scrollY) {
                    if (i === headerList.length - 1) {
                        shouldChangeCurrentSection = true
                        sectionId = headerList[i].id
                    }
                    continue
                } else {
                    shouldChangeCurrentSection = true
                    if (i === 0) {
                        sectionId = headerList[i].id
                    } else {
                        sectionId = headerList[i - 1].id
                    }
                    break
                }
            }

            if (shouldChangeCurrentSection && this.state.currentSection !== sectionId) {
                $('.toc-side a').removeClass('activeTocLink');
                $(".toc-side a[href='#" + sectionId + "']").addClass('activeTocLink');
                this.setState(() => ({
                    currentSection: sectionId
                }))
            }
        }
    }




    render() {
        const { classes, currentPostDetail, postDetailLoading } = this.props;
        var postDetail = null
        var toc = null
        if (currentPostDetail !== null) {
            postDetail = currentPostDetail.postDetail
            toc = currentPostDetail.toc
        }


        return (
            <div className={classes.root}>
                <Grid container className={classes.postDetailContainer}>
                    <Grid container >
                        <Grid item xs={12} container>
                            {/* Loading animation */}
                            <Grid item xs={12}>
                                {postDetailLoading && <LoadingBounce />}
                            </Grid>
                            {/* Post title and subtitle */}
                            <Grid item xs={12} md={3}></Grid>
                            <Grid item xs={12} md={1} style={{ maxWidth: '5%' }}></Grid>
                            <Grid item xs={12} md={8} style={{ padding: '0px 20px' }}>
                                {postDetail !== null && postDetail !== undefined && (
                                    <div>
                                        <div style={{ padding: '10px, 0px' }}>
                                            <Typography variant="h4" className={classes.postDetailTitle}>
                                                {postDetail.title}
                                            </Typography>
                                        </div>
                                        <div style={{ paddingTop: 10 }}>
                                            <PostSubtitle timestamp={postDetail.timestamp} category={postDetail.category} />
                                        </div>

                                        <hr style={{ marginTop: 10 }} />
                                    </div>
                                )}
                            </Grid>
                        </Grid>

                        {/* Left side table of content */}
                        <Grid item xs={12} md={3}>
                            <div className={['toc-side', classes.tocSide].join(' ')}>
                                {toc !== null && toc !== undefined && (
                                    <Fragment>
                                        <Typography variant="subtitle1" style={{ paddingLeft: 25 }} >Table of content</Typography>
                                        <Hidden smDown><Divider style={{ marginLeft: 20 }} /></Hidden>
                                        <div dangerouslySetInnerHTML={{ __html: toc }} />
                                    </Fragment>
                                )}
                            </div>
                        </Grid>

                        {/* Post detail */}
                        <Grid item xs={12} md={1} style={{ maxWidth: '5%' }}></Grid>
                        <Grid item xs={12} md={8} style={{ padding: '0px 20px' }}>
                            {postDetail !== null && postDetail !== undefined && (
                                <div>
                                    {/* <div sytle={{ padding: 30 }}> */}
                                    <div dangerouslySetInnerHTML={{ __html: md.render(postDetail.content) }} ref={this.postContent} className='postDetailContent' />
                                    {/* </div> */}
                                </div>
                            )}
                        </Grid>

                        {/* Post footer */}
                        <Grid item xs={12}><div style={{ padding: 100 }}></div></Grid>

                    </Grid>
                </Grid>
            </div >
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const slug = ownProps.match.params.slug
    return {
        currentPostDetail: state.postDetailView.currentPostDetail,
        slug: slug,
        postDetailLoading: state.postDetailView.postDetailLoading
    }
}

const mapDispatchToProps = {
    loadPostDetail,
    savePostToc,
    saveScrollPosition,
    selectDrawerCategoryArticle,
    savePostHeaderList
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(PostDetailView));