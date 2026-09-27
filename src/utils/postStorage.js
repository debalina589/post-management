import { seedPosts } from "../data/seedPosts.js";

const STORAGE_KEY = 'post-manager-posts';

function isValidPost(post){
    return(
        post !== null && 
        typeof post === 'object' &&
        typeof post.id === 'string' &&
        typeof post.title === 'string' &&
        typeof post.author === 'string' &&
        typeof post.content === 'string' &&
        Array.isArray(post.tags) && 
        post.tags.every((tag) => typeof tag === 'string') &&
        typeof post.createdAt === 'string' &&
        Number.isFinite(Date.parse(post.createdAt)) &&
        typeof post.updatedAt === 'string' && 
        Number.isFinite(Date.parse(post.updatedAt))   
    );
}

export function loadPosts(){
    try{
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved === null) {
            return {
                posts: seedPosts,
                error: '',
                canSave: true,
            };
        }

        const parsed = JSON.parse(saved);

        if (!Array.isArray(parsed) ||
        !parsed.every(isValidPost) ||
        new Set(parsed.map((post) => post.id)).size !== parsed.length
    ) {
            throw new Error('Invalid saved posts');
    }
    return{
        posts: parsed,
        error: '',
        canSave: true,
    };
    }catch{
        return{
            posts: seedPosts,
            error: 'Saved posts could not be loaded. Sample posts are shown temporarily. Automatic saving is paused to protect existing data.',
            canSave: false,
        };
    }
}

export function savePosts(posts){
    try{
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
        return '';
    }catch{
        return 'Changes are visible in this tab but could not be saved. They may be lost when you refresh.';
    }
}