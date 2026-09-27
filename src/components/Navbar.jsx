
import { NavLink, Link } from 'react-router-dom';

function Navbar() {
    function navClass({ isActive }){
        return [
            'rounded-lg px-4 py-2 text-sm font-semibold',
            'focus-visible:outline-2 focus-visible:outline-offset-2',
            'focus-visible:outline-indigo-600',
            isActive
            ? 'bg-indigo-100 text-indigo-800'
            : 'text-slate-600 hover:bg-slate-100',
        ].join(' ');
    }
  return (
    <header className='border-b border-slate-200 bg-white'>
        <div className='mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4'>
            <Link
            to='/'
            className='text-2xl font-bold text-indigo-700'>
            Post Manager
            </Link>
            <nav aria-label='Main navigation' className='flex gap-2'>
                <NavLink to='/' end className={navClass}>All Posts</NavLink>
                <NavLink to='/posts/new'  className={navClass}>Create Post</NavLink>
            </nav>
        </div>
    </header>
  );
}

export default Navbar;