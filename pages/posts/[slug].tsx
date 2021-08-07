import Strapi from '@/lib/Strapi';
import remark from "remark";
import remarkHtml from "remark-html";
// import NavMenu from "@/components/navMenu"
import TopBar from "@/components/topBar"
import PostBody from "@/components/postBody"
import BlogPostService from '@/lib/BlogPostService';
import { useState, useEffect } from 'react';
import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade'
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container'
import Link from "next/link";
import PostCard from '@/components/postCard';

const strapiApi = new Strapi();

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


    return (
        <Container>
            <PostBody post={post} mounting={pageInit} />

                <Paper square>
                    {morePosts.map((otherPost, ind) => (
                        <div key={'postCard-'+ind}>
                            <PostCard cmsDomain={domain} post={otherPost} />
                        </div>
                    ))}
                </Paper>
            </Container>
    );
}

export async function getStaticProps({ params }) {
    const response = await strapiApi.fetchPostWithSlug(
        {
            slug: params.slug
        }
    );

    const content = (await remark().use(remarkHtml).process(response.post[0].content)).toString();

    return {
        props: {
            post: {
                ...response?.post[0],
                content,
            },
            morePosts: response?.morePosts
        }
    };

}

export async function getStaticPaths() {

    const postService = new BlogPostService();
    const paths = await postService.getAllPostUrl();

    return {
        paths,
        fallback: false
    }

}