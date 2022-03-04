import { makeStyles } from '@material-ui/core/styles'
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core'
import { MorePostsInterface } from "@/interfaces/Strapi"
import Link from "next/link"
import Image from "next/image"

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
    },
    imageWrapper: {
        position: 'relative',
        width: '100%',
        height: '100%'
    }
}))

type PostCardProps = {
    post: MorePostsInterface,
    cmsDomain?: string,
    linkPrefix?: string
};

// const shimmer = (w, h) => `
// <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
//   <defs>
//     <linearGradient id="g">
//       <stop stop-color="#333" offset="20%" />
//       <stop stop-color="#222" offset="50%" />
//       <stop stop-color="#333" offset="70%" />
//     </linearGradient>
//   </defs>
//   <rect width="${w}" height="${h}" fill="#333" />
//   <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
//   <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
// </svg>`

// const toBase64 = (str) =>
//   typeof window === 'undefined'
//     ? Buffer.from(str).toString('base64')
//     : window.btoa(str)

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
//                                image={`${cmsDomain}${post.coverImage.url}`}
                                title={post.title}
                            >
                                <div className={classes.imageWrapper}>
                                    <Image 
                                        layout="fill" 
                                        objectFit="cover" 
                                        src={`${cmsDomain}${post.coverImage.url}`} 
                                    />
                                </div>
                            </CardMedia>    
                            :
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