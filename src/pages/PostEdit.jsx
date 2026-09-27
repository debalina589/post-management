
import { Link, useNavigate, useParams } from 'react-router-dom';
import PostForm from '../components/PostForm.jsx';

function PostEdit({ posts, onUpdatePost }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const post = posts.find((item) => item.id === id);

    function handleUpdate(formData){
      onUpdatePost(id, formData);
      navigate(`/posts/${id}`);
    }

    if (!post) {
      return(
        <section>
          <h1 className='text-3xl font-bold'>Post not found</h1>
          <Link 
            to='/'
            className='mt-4 inline-block text-indigo-700 underline'>
              Back to all posts
          </Link>
        </section>
      );
    }

  return (
    <section className='mx-auto max-w-3xl'>
        <Link 
        to={`/posts/${id}`} 
        className='text-indigo-700 underline'>
        Back to post
        </Link>

        <h1 className='mt-5 text-3xl font-bold'>Edit Post</h1>

        <p className='mt-2  text-slate-600'>Update your post below, then save your changes.</p>

       <PostForm
        key={post.id}
        initialPost={post}
        onSubmit={handleUpdate}
        submitLabel='Save Changes'
        cancelTo={`/posts/${id}`}/>
    </section>
  );
}

export default PostEdit;