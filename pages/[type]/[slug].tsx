import Strapi from '@/lib/Strapi'
import remark from "remark";
import remarkHtml from "remark-html"
// import NavMenu from "@/components/navMenu"
import PostBody from "@/components/postBody"
import BlogPostService from '@/lib/BlogPostService'
import { useState, useEffect } from 'react'
import Collapse from '@material-ui/core/Collapse'
import Fade from '@material-ui/core/Fade'
import Slide from '@material-ui/core/Slide'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import PostCard from '@/components/postCard'
import { useRouter } from 'next/router'
import Divider from '@material-ui/core/Divider'

export default function Post(props) {

    const { post, morePosts } = props;

    const [pageInit, setPageInit] = useState(false);
    const [postId, setPostId] = useState(null);

    useEffect(() => {

        if(typeof postId == 'undefined') {
            setPostId(post.id)
            setPageInit(false);
            return;
        }

        if(postId != post.id) {
            setPostId(post.id);
            setPageInit(true);
            return;
        }

        if(postId == post.id) setPageInit(true);

    })

    const domain = process.env.NEXT_PUBLIC_STRAPI_API_URL

    const router = useRouter();

    return (
        <Container>
            <PostBody post={post} mounting={pageInit} />
            <Divider variant="middle" />
            <Paper square>
                {morePosts.map((otherPost, ind) => (
                    <div key={'postCard-'+ind}>
                        <PostCard linkPrefix={`/${router.query.type}`} cmsDomain={domain} post={otherPost} />
                    </div>
                ))}
            </Paper>
        </Container>
    );
}

export async function getStaticProps({ params }) {

    const postService = new BlogPostService();

    const response = await postService.getPost(
        {
            where: {
                slug: params.slug
            },
            morePosts: true,
            orderBy: "date:desc",
            whereMorePost: {
                types: {
                    key: params.type
                }
            }
        }
    );

    const content = (await remark().use(remarkHtml).process(response.post.content)).toString();

    return {
        props: {
            post: {
                ...response?.post,
                content,
            },
            morePosts: response?.morePosts
        }
    };

}

export async function getStaticPaths() {

    const postService = new BlogPostService();
//All post could be handle here....
    const paths = await postService.getPostUrlByType(['tech', 'bike', 'others']);

    return {
        paths,
        fallback: false
    }

}