import { useState, useEffect, useRef } from "react";
import Collapse from "@material-ui/core/Collapse";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import { PostInterface } from "@/interfaces/Strapi";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CalendarDate from "@/components/calendarDate";
import classnames from "classnames"
import Image from 'next/image'

type PostBodyProps = {
    post: PostInterface;
    mounting: boolean;
};

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        backgroundColor: theme.palette.primary.main,
    },
    root: {
        paddingTop: "3rem",
    },
    paperContent: {
        color: theme.palette.text.secondary
    },
    img: {
        // maxHeight: '30rem',
        maxWidth: "100%",
        overflow: "hidden",
    },
    imageWrapper: {
        maxHeight: "25rem",
        overflow: "hidden",
        position: 'relative'
    },
    title: {
        color: theme.palette.secondary.light,
    },
}));

export default function PostBody(props: PostBodyProps) {
    const { post, mounting } = props;
    const [coverLoaded, setCoverLoaded] = useState(post.ogImage == null);
    const classes = useStyles();
    const imgDomain = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const imageElm = useRef<HTMLImageElement>();
    const [postDate, setPostDate] = useState(null)

    useEffect(() => {
        if (
            coverLoaded == false &&
            imageElm.current != null &&
            imageElm.current.complete
        )
            setCoverLoaded(true);
        // if(imageElm.current != null && imageElm.current.complete) setCoverLoaded(true);
        console.log('postDate', post.date)
        if(typeof post.date === 'string') {
            try{
                let curPostDate = new Date(post.date)
                console.log('curPostDate', curPostDate)
                setPostDate(curPostDate)
            }catch(error) {
                //Do nothing
                console.log('getError!')
            }
        }

    }, [post]);

console.log('before render', postDate)
    return (
        <div className={classes.root}>
            {console.log("mounting", mounting, coverLoaded, mounting && coverLoaded)}
            <Typography
                className={classes.title}
                variant="h2"
                component="h1"
                gutterBottom
            >
                {post.title}
            </Typography>

            <Fade timeout={{ enter: 1000 }} in={mounting && coverLoaded}>
                <Paper className={classes.paper} square elevation={3}>
                    {post.ogImage ? (
                        <Grid
                            container
                            className={classes.imageWrapper}
                            justifyContent="center"
                            alignItems="center"
                            alignContent="center"
                        >
                            <img
                                ref={imageElm}
                                onLoad={setCoverLoaded.bind(this, true)}
                                className={classes.img}
                                src={`${imgDomain}${post.ogImage.url}`}
                            />
                        </Grid>
                    ) : (
                        ""
                    )}
                    <Collapse
                        mountOnEnter={true}
                        unmountOnExit={true}
                        timeout={{ enter: 700 }}
                        in={mounting && coverLoaded}
                    >
                        <Box p={3}>
                            {postDate === null ? null : <CalendarDate date={postDate}/>}
                            <div className={classnames(['ck-content', classes.paperContent])} dangerouslySetInnerHTML={{ __html: post.content }} />
                        </Box>
                    </Collapse>
                </Paper>
            </Fade>
        </div>
    );
}
