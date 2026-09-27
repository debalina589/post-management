import { Link, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import PostList from "./pages/PostList";
import PostCreate from './pages/PostCreate';
import PostView from "./pages/PostView";
import PostEdit from "./pages/PostEdit";

import { useState } from "react";
import { loadPosts, savePosts } from "./utils/postStorage.js";

function App() {
  const [initialData] = useState(loadPosts);
  const [posts, setPosts] = useState(initialData.posts);
  const [storageError, setStorageError] = useState(initialData.error);

  // useEffect(()=>{
  //   if (!initialData.canSave) {
  //     return;
  //   }

  //   const error = savePosts(posts);
  //   setStorageError(error);
  // },[posts, initialData.canSave]);

  function commitPosts(nextPosts){
    setPosts(nextPosts);
    if (initialData.canSave) {
      const error = savePosts(nextPosts);
      setStorageError(error);
    }
  }

  function createPost(formData){
    const timestamp = new Date().toISOString();

    const newPost = {
      id: crypto.randomUUID(),
      title: formData.title,
      author: formData.author,
      content: formData.content,
      tags: formData.tags,
      createdAt: timestamp,
      updatePost: timestamp,
    };
    commitPosts([
      newPost,
      ...posts,
    ]);
    return newPost.id;
  }

  function updatePost(id, formData){
    const updateAt = new Date().toISOString();

   const nextPosts = posts.map((post) => 
      post.id === id
  ? {
    ...post,
    title: formData.title,
    author: formData.author,
    content: formData.content,
    tags: formData.tags,
    updateAt,
  }
    : post
  );
  commitPosts(nextPosts);
  }

  function deletePost(id){
    const nextPosts = posts.filter((post) => post.id !== id);
    commitPosts(nextPosts);
  }
  return (
    <div className='min-h-screen bg-slate-100 text-slate-900'>
     <Navbar/>

    <main className='mx-auto max-w-6xl px-4 py-8'>
      {storageError && (
        <p
        role="alert"
        className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900">{storageError}</p>
      )}
      <Routes>
        <Route path="/" element={<PostList posts={posts} onDeletePost={deletePost}/>}/>
        <Route path="/posts/new" element={<PostCreate onCreatePost={createPost}/> } />
        <Route path="/posts/:id" element={<PostView posts={posts}/> } />
        <Route 
        path="/posts/:id/edit" 
        element={<PostEdit posts={posts} onUpdatePost={updatePost}/>}/>
        <Route path="*" 
        element={
          <section>
            <h1 className="text-3xl font-bold">Page not found</h1>
            <Link to='/' className="mt-4 inline-block text-indigo-700 underline">Back to all posts</Link>
          </section>
        }/>
      </Routes> 
    </main>  
    </div>
  );
}

export default App;