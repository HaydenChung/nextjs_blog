export interface errorHandler {(error: any): void};
export type PostInterface = {
    id?: number,
    title?: string,
    excerpt?: string,
    date?: string,
    content?: string,
    coverImage?: {
        url: string
    },
    ogImage?: {
        url: string
    },
    types?: {
        name?: string,
        key?: string
    },
    slug?: string
}
export type MorePostsInterface = {
    id?: number,
    title?: string,
    excerpt?: string,
    date?: string,
    coverImage?: {
        url: string
    },
    types?: {
        name?: string,
        key?: string
    },
    slug?: string,
}