import { Link, useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm.jsx';

function PostCreate({ onCreatePost }) {
  const navigate = useNavigate();

  function handleCreate(formData){
    const newPostId = onCreatePost(formData);
    navigate(`/posts/${newPostId}`);
  }

  return (
    <section className='mx-auto max-w-3xl'>
        <Link to='/' className='text-indigo-700 underline'>
            Back to all posts
        </Link>

        <h1 className='mt-5 text-3xl font-bold'>Create a Post</h1>
        <p className='mt-2 text-slate-600'>
            Add a title, author, content, and optional tags.
        </p>

        <PostForm 
        onSubmit={handleCreate}
        submitLabel='Create Post'
        cancelTo='/'
        />
    </section>
  );
}

export default PostCreate;