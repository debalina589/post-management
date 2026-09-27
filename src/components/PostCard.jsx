
import { Link } from 'react-router-dom';

function PostCard({ post, onDeletePost }) {
    const quote = 
    post.content.length > 120 
    ? `${post.content.slice(0, 120)}...`
    : post.content;

    const formattedDate = new Date(post.createAt).toLocaleDateString(
        'en-IN',
        {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }
    );

    function handleDelete(){
        const confirmed = window.confirm(
            `Delete "${post.title}"? This cannot be undone.`
        );
        if (confirmed) {
            onDeletePost(post.id);
        }
    }
  return (
    <article className='flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
        <h2 className='wrap-break-word text-xl font-bold'>
            <Link to={`/posts/${post.id}`} className='hover:text-indigo-700 hover:underline'>{post.title}</Link>
        </h2>
        <p className='mt-2 text-sm text-slate-600'>By {post.author}</p>
        <time 
        dateTime={post.createdAt}
        className='mt-1 text-sm text-slate-500'
        >{formattedDate}</time>
        <p className='mt-4 wrap-break-word leading-7 text-slate-600'>{quote}</p>
        <ul className='mt-4 flex flex-wrap gap-2' aria-label='Post tags'>
            {post.tags.map((tag) => (
            <li 
             key={tag}
             className='rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700'>{tag}</li>
            ))}
        </ul>
        <div className='mt-auto flex flex-wrap items-center gap-5 pt-6 '>
            <Link
                to={`/posts/${post.id}`}
                className='font-semibold text-indigo-700 underline underline-offset-4'
                aria-label={`Read ${post.title}`}>Read post
            </Link>
            <Link
                to={`/posts/${post.id}/edit`}
                className='font-semibold text-indigo-700 underline underline-offset-4'
                aria-label={`Edit ${post.title}`}>Edit
            </Link>
            <button 
                type='button'
                onClick={handleDelete}
                className='rounded-md px-2 py-1 font-semibold text-red-700 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-red-500'
                aria-label={`Delete ${post.title}`}>
                    Delete
                </button>
        </div>
    </article>
  );
}

export default PostCard;