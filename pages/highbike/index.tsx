import BlogPostService from "@/lib/BlogPostService"
import PostBody from "@/components/postBody"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import PostCard from "@/components/postCard"
import FloatedPostCard from "@/components/floatedPostCard"
import { useState, useEffect } from "react"

function Bike({post, morePosts}) {


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
                        morePosts.map((morePost, ind)=> <FloatedPostCard linkPrefix='/bike' key={'post-card-'+ind} post={morePost} floatLeft={ind %2 == 0} />)
                    }
                </Grid>
            </Grid>
        </Container>
    )
}

export default Bike


export async function getStaticProps() {

    const postService = new BlogPostService();
    const props = await postService.getBikePost({where: { types: {name : 'Bike'}}, morePosts: true});

    return {
        props
    };

}