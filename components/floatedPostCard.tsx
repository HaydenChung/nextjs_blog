import { makeStyles } from '@material-ui/core/styles'
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core'
import { MorePostsInterface } from "@/interfaces/Strapi"
import classnames from 'classnames'
import Link from "next/link"
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
    postCardAction: {
        display: 'flex',
        flexWrap: 'nowrap',
        minHeight: '30rem'
    },
    leftRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    rightRow: {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end'
    },
    root: {
        display: 'flex',
        marginBottom: '1rem',
        marginTop: '1rem',
    },
    floatLeft: {
        justifyContent: 'flex-start'
    },
    floatRight: {
        justifyContent: 'flex-end'
    },
    postContent: {
        width: '70%'
    },
    postCardMedia: {
        height: '100%',
        width: '30%',
        minHeight: '30rem',
        overflow: 'hidden'
    },
    postCard: {
        width: '100%',
        backgroundColor: theme.palette.primary.main

    }
}))

type PostCardProps = {
    post: MorePostsInterface,
    floatLeft?: boolean,
    linkPrefix?: string,
    cmsDomain?: string
};

export default function FloatPostCard({ post, floatLeft = true, linkPrefix = '/posts', cmsDomain= process.env.NEXT_PUBLIC_STRAPI_API_URL }: PostCardProps) {

    const classes = useStyles();

    return (
        <Grid container className={classnames(classes.root, floatLeft ? classes.floatLeft: classes.floatRight)}>
            <Grid item md={8} lg={8} className={classes.postCard}>
                <Card raised={true} className={classes.postCard}>
                    <Link href={`${linkPrefix}/${post.slug}`} passHref>
                        <CardActionArea className={classnames(classes.postCardAction, floatLeft ? classes.leftRow : classes.rightRow)}>
                            <CardContent className={classes.postContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {post.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {post.excerpt}
                                </Typography>
                            </CardContent>
                            {
                                post.coverImage != null ?
                                    <CardMedia
                                        className={classes.postCardMedia}
                                        image={`${cmsDomain}${post.coverImage.url}`}
                                        title={post.title}
                                    /> :
                                    ''
                            }
                        </CardActionArea>
                    </Link>
                </Card>
            </Grid>
        </Grid>
    )

}