import axios from "axios";
import { errorHandler, PostInterface, MorePostsInterface } from "@/interfaces/Strapi";

export default class Strapi {

    private apiUrl: string;

    constructor(apiUrl?: string) {

        this.apiUrl = typeof apiUrl != 'undefined' && apiUrl != '' ? apiUrl : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`;

    }

    public async fetchApi({ query, variables = undefined, errorHandler = undefined }: { query: string, variables?: object, errorHandler?: errorHandler }): Promise<any> {

        try {
            console.log('query',query, 'params', variables);

            const resp = await axios.post(
                this.apiUrl,
                {
                    query,
                    variables
                }
            );

            return resp.data.data;

        } catch (error) {

            if (typeof errorHandler == 'function') errorHandler(error);

        };

    }

    public fetchAllPostSlugs(errorHandler?: errorHandler): Promise<{posts}> {

        const query = `
            {
                posts {
                    slug
                }
            }
        `;

        return this.fetchApi({ query, errorHandler });

    }

    public fetchAllPostSlugsByType(types: {key: string[]}, errorHandler: errorHandler): Promise<{posts}> {

        const query = `
            query fetchPostsByType($where: JSON)
                {
                    posts(where: $where, sort: "date:desc"){
                        slug
                    }
                }
        `;

        const variables = {
            where: {
                types
            }
        };

        return this.fetchApi({query, variables, errorHandler});

    }

    public fetchPostWithSlug({slug,  errorHandler = undefined }: { slug: string,errorHandler?: errorHandler }): Promise<any> {

        const query = `
        query fetchPostWithSlug($where: JSON, $where_more: JSON)
            {
                post: posts(limit:1 ,where: $where) 
                {
                    id,
                    title,
                    excerpt,
                    date,
                    content,
                    coverImage {
                        url
                    },
                    ogImage: coverImage {
                        url
                    },
                    types {
                        name
                    }
                },
                
                morePosts: posts(sort: "date:desc", limit: 10, where: $where_more) 
                {
                    title
                    slug
                    excerpt
                    date
                    coverImage {
                        url
                    },
                    types {
                        name
                    }
                }
            }
        `;

        return this.fetchApi({
            query,
            variables: {
                where: {
                    slug
                },
                where_more: {
                    slug_ne: slug
                }
            },
            errorHandler
        });

    }

    public getMorePost(
        {where, errorHandler, orderBy, limit=10}:
        {where?: PostInterface, errorHandler?: errorHandler, orderBy?: string, limit?: number}
    ): Promise<{morePosts: MorePostsInterface[]}> 
    {

        const query = `
            fetchMorePost($where: JSON, $limit: Int, $sort: String) {
                morePosts: posts(sort: $sort, limit: $limit, where: $where) 
                {
                    title
                    slug
                    excerpt
                    date
                    coverImage {
                        url
                    },
                    types {
                        name
                    }
                }
            }
        `;


        return this.fetchApi({
            query,
            variables: {
                where,
                orderBy
            },
            errorHandler
        });

    }

    public getPost(
        {where, errorHandler, whereMorePost, orderBy}: 
        {where?: PostInterface, errorHandler?: errorHandler, whereMorePost?: MorePostsInterface, orderBy?: string}
    ): Promise<{post: PostInterface[], morePosts?: MorePostsInterface[]}> 
    {

        const moreQuery = whereMorePost ? `
            morePosts: posts(limit: 10, where: $whereMorePost, sort: $orderBy) 
            {
                id,
                title
                slug
                excerpt
                date
                coverImage {
                    url
                },
                types {
                    name
                }
            }
        ` : '';

        const whereMorePostParam = whereMorePost ? '$whereMorePost: JSON,' : '';

        const query = `
            query fetchPost($where: JSON, ${whereMorePostParam} $orderBy: String)
            {
                post: posts(limit:1 ,where: $where, sort: $orderBy) 
                {
                    id,
                    title,
                    excerpt,
                    date,
                    content,
                    coverImage {
                        url
                    },
                    ogImage: coverImage {
                        url
                    },
                    types {
                        name
                    }
                }
                    ${moreQuery}
            }
        `;

        return this.fetchApi({
            query,
            variables: {
                where,
                whereMorePost,
                orderBy
            },
            errorHandler
        });

    }

}