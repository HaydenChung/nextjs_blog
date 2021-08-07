import { useState, useEffect, useRef } from 'react'
import Collapse from '@material-ui/core/Collapse'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import { PostInterface } from '@/interfaces/Strapi'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

type PostBodyProps = {
    post: PostInterface,
    mounting: boolean
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        backgroundColor: theme.palette.primary.main
    },
    root: {
        paddingTop: '3rem'
    },
    img: {
        // maxHeight: '30rem',
        maxWidth: "100%",
        overflow: 'hidden'
    },
    imageWrapper: {
        maxHeight: '25rem',
        overflow: 'hidden',
        // position: 'relative'
    },
    title: {
        color: theme.palette.secondary.light
    }
}));

export default function PostBody(props: PostBodyProps) {

    const { post, mounting } = props;
    const [coverLoaded, setCoverLoaded] = useState(post.ogImage == null);
    const classes = useStyles();
    const imgDomain = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const imageElm = useRef<HTMLImageElement>();

    useEffect(()=> {
        if(coverLoaded == false && imageElm.current.complete) setCoverLoaded(true);
    })

    return (
        <div className={classes.root}>
            {console.log('mounting', mounting , coverLoaded,mounting && coverLoaded)}
            <Typography className={classes.title} variant="h2" component="h1" gutterBottom>
                {post.title}
            </Typography>
            <Collapse timeout={{enter: 700, exit: 1000}} in={(mounting && coverLoaded)}>
                <Fade timeout={{enter: 1000, exit: 800}} in={(mounting && coverLoaded)}>
                        <Paper className={classes.paper} variant="outlined" square>
                            {
                                post.ogImage ?
                                (
                                    <Grid container className={classes.imageWrapper} justifyContent="center" alignItems="center" alignContent="center">
                                        <img ref={imageElm} onLoad={ setCoverLoaded.bind(this, true)} className={classes.img} src={`${imgDomain}${post.ogImage.url}`} />
                                    </Grid>
                                ):
                                ''
                            }
                            <Box p={3}>
                                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                            </Box>
                        </Paper>
                </Fade>
            </Collapse>
        </div>
    );
}