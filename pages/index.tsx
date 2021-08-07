import BlogPostService from '@/lib/BlogPostService';
import Link from "next/link";
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

function HomePage({ allPosts }) {

    return (
        <Container maxWidth="md">
            <Paper variant="outlined" square>
                {
                    allPosts.map((slug, ind) => (
                        <div>
                            <Link key={`slug-${slug}-${ind}`} href={slug} >
                                <a key={`a-link-${slug}-${ind}`}>{slug}</a>
                            </Link>

                        </div>
                    ))
                }
            </Paper>
        </Container>
    )
}


export async function getStaticProps({ params }) {

    let postService = new BlogPostService();

    let urls = await postService.getAllPostUrl();

    return {
        props: {
            allPosts: urls
        }
    };

}

export default HomePage

