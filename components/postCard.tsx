import { makeStyles } from '@material-ui/core/styles'
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core'
import { MorePostsInterface } from "@/interfaces/Strapi"
import Link from "next/link"

const useStyles = makeStyles((theme)=> ({
    media: {
        height: 240
    },
    postCard: {
        // paddingTop: theme.spacing(3),
        backgroundColor: theme.palette.primary.main
    },
    root: {
        // borderBottomColor: theme.palette.primary.dark,
        // borderBottomWidth: '2px',
        // borderBottomStyle: 'solid'
        marginTop: '2px',
        marginBottom: '2px'
    }
}))

type PostCardProps = {
    post: MorePostsInterface,
    cmsDomain?: string,
    linkPrefix?: string
};

export default function PostCard({ post, cmsDomain = process.env.NEXT_PUBLIC_STRAPI_API_URL, linkPrefix = '/posts' }: PostCardProps) {

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <Link href={`${linkPrefix}/${post.slug}`} passHref>
                <CardActionArea className={classes.postCard}>
                {
                        post.coverImage != null ?
                            <CardMedia
                                className={classes.media}
                                image={`${cmsDomain}${post.coverImage.url}`}
                                title={post.title}
                            /> :
                            ''
                    }
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {post.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {post.excerpt}
                        </Typography>
                    </CardContent>


                </CardActionArea>
            </Link>
        </Card>
    )

}