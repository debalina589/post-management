import { Link, useParams } from 'react-router-dom';

function PostView({ posts }) {
    const { id } = useParams();
    const post = posts.find((item) => item.id === id);
    if (!post) {
      return (
        <section>
          <h1 className='text-3xl font-bold'>Post not found</h1>
          <p className='mt-3 text-slate-600'>This post does not exist or has been deleted.</p>
          <Link to='/' className='mt-5 inline-block text-indigo-700 underline'>Back to all posts</Link>
        </section>
      );
    }
  return (
    <section>
        <Link to='/' className='text-indigo-700 underline'>
        Back to all posts
        </Link>
      <article className='mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10'>
        <h1 className='wrap-break-word text-3xl font-bold'>{post.title}</h1>
        <p className='mt-3 text-slate-600'>
          By {post.author}
        </p>
        <div className='mt-3 space-y-1 text-sm text-slate-500'>
          <p>Created: {' '}
            <time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleString('en-IN')}</time>
          </p>
          <p>Updated: {' '}
            <time dateTime={post.updatedAt}>{new Date(post.updatedAt).toLocaleString('en-IN')}</time>
          </p>
        </div>
        <p className='mt-6 whitespace-pre-wrap wrap-break-word leading-8 text-slate-700'>{post.content}</p>
        <ul className='mt-6 flex flex-wrap gap-2' aria-label='Post tags'>
          {post.tags.map((tag) => (
            <li key={tag} className='rounded-full bg-indigo-50 px-3 py-1 text-sm text-indigo-700'>{tag}</li>
          ))}
        </ul>
        <Link to={`/posts/${post.id}/edit`} className='mt-8 inline-block rounded-lg bg-indigo-700 px-5 py-3 font-semibold text-white hover:bg-indigo-800'>Edit Post</Link>
      </article>
    </section>
  );
}

export default PostView;