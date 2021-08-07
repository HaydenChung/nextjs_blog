import Strapi from './Strapi';
import remark from "remark";
import remarkHtml from "remark-html";
import Link from "next/link"
import { PostInterface, MorePostsInterface } from "@/interfaces/Strapi"

export default class BlogPostService {

    private strapi: Strapi;
    private instance: BlogPostService;

    //Only want 1 existing
    constructor() {

        if (!this.instance) {

            this.instance = this;

            this.strapi = new Strapi();
        }

        return this.instance;

    }

    async getAllPostUrl(errorHandler?) {

        const response = await this.strapi.fetchAllPostSlugs(errorHandler);

        return (response.posts.map((post) => `/posts/${post.slug}`) || []);

    }

    async getAllBikePostUrl(errorHandler?) {

        const response = await this.strapi.fetchAllPostSlugs(errorHandler);
        
        return (response.posts.map((post)=> `/bike/${post.slug}`) || []);

    }

    async getPostUrlByType(types: string[], errorHandler?) {
        const response = await this.strapi.fetchAllPostSlugsByType({key: types}, errorHandler);

        const result = [];

        types.forEach((type)=> {
            const refinedType = type.toLowerCase();
            response.posts.forEach((post)=> {
                result.push(`/${refinedType}/${post.slug}` || [])
            })
        });

        return result;

        // return (response.posts.map((post)=> `/${type}/${post.slug}`) || []);
    }

    async getPost(
        { where = {}, morePosts, whereMorePost = null, orderBy }:
            { where?: PostInterface, morePosts?: boolean, whereMorePost?: PostInterface, orderBy?: any }
    ): Promise<{ post: PostInterface, morePosts?: MorePostsInterface[] }> {

        let options = {
            where,
            orderBy
        };

        if (morePosts === true) {
            options['whereMorePost'] = whereMorePost ? whereMorePost: where;
        }

        const response = await this.strapi.getPost(options);

        const content = (await remark().use(remarkHtml).process(response.post[0].content)).toString();

        const result = {
            post: {
                ...response?.post[0],
                content
            },
        };
        if (morePosts === true) {

            response.morePosts.some((mPost, ind)=> {
                if(mPost.id === result.post.id) {
                    
                    response.morePosts.splice(ind, 1);

                    return true;
                }
            })

            result['morePosts'] = response.morePosts;
        }

        return result;

    }

    async getTechPost(
        { where = {}, morePosts }:
            { where?: PostInterface, morePosts?: boolean }
    ): Promise<{ post: PostInterface, morePosts?: MorePostsInterface[] }> {


        return this.getPost(
            {
                where: {
                    ...where,
                    types: {
                        name: 'Tech'
                    }
                },
                morePosts,
                orderBy: 'date:desc'
            }
        );

    }


    async getBikePost(
        { where = {}, morePosts }:
            { where?: PostInterface, morePosts?: boolean }
    ): Promise<{ post: PostInterface, morePosts?: MorePostsInterface[] }> {


        return this.getPost(
            {
                where: {
                    ...where,
                    types: {
                        name: 'Bike'
                    }
                },
                morePosts,
                orderBy: 'date:desc'
            }
        );

    }


    async getOthersPost(
        { where = {}, morePosts }:
            { where?: PostInterface, morePosts?: boolean }
    ): Promise<{ post: PostInterface, morePosts?: MorePostsInterface[] }> {

        return this.getPost(
            {
                where: {
                    ...where,
                    types: {
                        name: 'Others'
                    }
                },
                morePosts,
                orderBy: 'date:desc'
            }
        );

    }


}