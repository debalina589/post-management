import { useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard.jsx';
import Pagination from '../components/Pagination.jsx';

function PostList({ posts, onDeletePost }) {
  const [search, setSearch] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [notice, setNotice] = useState('');
  const [page, setPage] =useState(1);
  const postPerPage = 6

  const authors = [...new Set(posts.map((post) => post.author))]
  .sort((a, b) => a.localeCompare(b));

  const activeAuthor = authors.includes(selectedAuthor)
    ? selectedAuthor
    : '';

    const searchTerm = search.trim().toLowerCase();

    const filteredPosts = posts.filter((post) =>{
      const matchesTitle = post.title.toLowerCase().includes(searchTerm);

      const matchesAuthor = activeAuthor === '' || post.author === activeAuthor;
      return matchesTitle && matchesAuthor;
    });

    const totalPages = Math.ceil(filteredPosts.length / postPerPage);
    const currentPage = Math.min(
      Math.max(page, 1),
      Math.max(totalPages, 1)
    );

    const startIndex = (currentPage - 1) * postPerPage;
    const paginatedPosts = filteredPosts.slice(
      startIndex,
      startIndex + postPerPage
    );

    const firstVisiblePost =
      filteredPosts.length === 0 ? 0 : startIndex + 1;

    const lastVisiblePost = Math.min(
      startIndex + postPerPage,
      filteredPosts.length
    );  

    function clearFilters(){
      setSearch('');
      setSelectedAuthor('');
      setPage(1);
    }

    function handleDeletePost(id){
      const deletedPost = posts.find((post) => post.id === id);

      if (!deletedPost) return;

      const remainingPosts = posts.filter((post) => post.id !== id);

      const selectedAuthorStillExists = remainingPosts.some(
        (post) => post.author === selectedAuthor
      );

      if (selectedAuthor && !selectedAuthorStillExists) {
        setSelectedAuthor('');
      }
      onDeletePost(id);
      setPage(1);
      setNotice(`"${deletedPost.title}" was removed from the list.`);
    }
  return (
    <section>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div>
        <h1 className='text-3xl font-bold'>All Posts</h1>
        <p className='mt-2 text-slate-600'>{posts.length} posts in your collection</p>
        </div>
        <Link to='/posts/new' className='rounded-lg bg-indigo-700 px-5 py-3 font-semibold text-white hover:bg-indigo-800'>Create a Post
        </Link>
        </div>
        <p role='status' className='mt-4 text-emerald-800'>{notice}</p>
        <div className='mt-6 grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-5 md:grid-cols-2'>
          <div>
            <label htmlFor="post-search" className='block font-semibold'>
              Search by title
            </label>

            <input 
            id='post-search'
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder='For example: React' 
            className='mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-2 focus:outline-indigo-600'/>
          </div>
          <div>
            <label htmlFor="author-filter"
            className='block font-semibold'>Filter by author</label>
            <select id="author-filter"
            value={activeAuthor}
            onChange={(e)=> {
              setSelectedAuthor(e.target.value);
              setPage(1);
            }}
            className='mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 focus:outline-2 focus:outline-indigo-600'>
              <option value="">All authors</option>
              {authors.map((author) =>(
                <option value={author} key={author}>{author}</option>
              ))}
            </select>
          </div>
        <div className='mt-4 flex flex-wrap items-center justify-between gap-3'>
           <p role='status' className='text-sm text-slate-600'>Showing 
            {firstVisiblePost}-{lastVisiblePost} of{' '}
            {filteredPosts.length} matching posts ({posts.length} total)</p>   
           {(search !== '' || activeAuthor !== '') && (
            <button type='button' onClick={clearFilters} className='font-semibold text-indigo-700 underline'>Clear filters</button>
           )}
        </div>      
        </div>
        {posts.length === 0 ? (
          <div className='mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center'>
            <h2 className='text-xl font-semibold'>No posts yet</h2>
            <p className='mt-2 text-slate-600'>Create your first post to get started</p>
            </div>
        ) : filteredPosts.length === 0 ? (
          <div className='mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center'>
            <h2 className='text-xl font-semibold'>
              No matching posts
            </h2>
            <p className='mt-2 text-slate-600'>Try another title or choose a different author.</p>
          </div>
          ):(<div className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {paginatedPosts.map((post) => 
            (<PostCard key={post.id} post={post} onDeletePost={handleDeletePost}/> 
            ))}
            </div>
        )}
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}/>
    </section>
  );
}

export default PostList;