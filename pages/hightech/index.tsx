import BlogPostService from "@/lib/BlogPostService"
import PostBody from "@/components/postBody"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import FloatedPostCard from "@/components/floatedPostCard"
import { useState, useEffect } from "react"

function Tech({ post, morePosts }) {

    
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


    return (
        <Container>
            <Grid container direction="column" alignItems="flex-start" >
                <Grid item md={12}>
                    <PostBody post={post} mounting={pageInit} />
                </Grid>
                <Grid item md={12}>
                    {
                        morePosts.map((morePost, ind) => <FloatedPostCard linkPrefix="/tech" key={'post-card-'+ind} post={morePost} floatLeft={ind % 2 == 0} />)
                    }
                </Grid>
            </Grid>
        </Container>
    )
}

export default Tech


export async function getStaticProps() {

    const postService = new BlogPostService();
    const props = await postService.getTechPost({ where: { types: { name: 'Tech' } }, morePosts: true });

    return {
        props
    };

}
