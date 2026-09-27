import { useState} from 'react';
import { Link } from 'react-router-dom'

function PostForm({ 
    initialPost,
    onSubmit,
    submitLabel = 'Save Changes',
    cancelTo = '/',
}) {
    const [values, setValues] = useState({
        title: initialPost?.title ?? '',
        author: initialPost?.author ?? '',
        content: initialPost?.content ?? '',
        tags: initialPost?.tags?.join(', ') ?? '',
    });

    const [errors, setErrors] = useState({});

    function handleChange(event){
        const { name, value } = event.target;

        setValues((previous) =>({
            ...previous,
            [name]: value,
        }));
    }

    function handleSubmit(event){
        event.preventDefault();

        const title = values.title.trim();
        const author = values.author.trim();
        const content = values.content.trim();

        const nextErrors = {};

        if (!title) {
            nextErrors.title = 'Please enter a title.';
        }
        if (!author) {
            nextErrors.author = 'Please enter an author.';
        }
        if (content.length < 20) {
            nextErrors.content = 'Content must contain at least 20 characters.';
        }
        setErrors(nextErrors);

        const firstInvalidFeiled = Object.keys(nextErrors)[0];

        if (firstInvalidFeiled) {
            event.currentTarget.elements
            .namedItem(firstInvalidFeiled)
            ?.focus();

            return;
    }

    const tags = [
        ...new Set(
            values.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean)
        ),
    ];
    onSubmit({
        title,
        author,
        content,
        tags,
    });
}

function fieldClass(name){
    return [
        'mt-2 w-full rounded-lg border bg-white px-3 py-2',
        'focus:outline-2 focus:outline-indigo-600',
        errors[name] ? 'border-red-600' : 'border-slate-300',
    ].join(' ');
}
  return (
    <form  
        onSubmit={handleSubmit}
        noValidate
        className='mt-6 space-y-5 rounded-xl border border-slate-200 bg-white p-6'>
            <div>
                <label htmlFor="title" className='font-semibold'></label>
                <input 
                    id='title'
                    name='title'
                    value={values.title}
                    onChange={handleChange}
                    className={fieldClass('title')}
                    required
                    aria-invalid={Boolean(errors.title)}
                    aria-describedby={errors.title ? 'title-error' : undefined} />

                    {errors.title && (
                        <p id='title-error' className='mt-2 text-sm text-red-700'>{errors.title}</p>
                    )}
            </div>

            <div>
                <label htmlFor="author" className='font-semibold'>Author</label>

                <input 
                    id='author'
                    name='author'
                    value={values.author}
                    onChange={handleChange}
                    className={fieldClass('author')}
                    required
                    aria-invalid={Boolean(errors.author)}
                    aria-describedby={errors.author ? 'author-error' : undefined} />

                    {errors.author && (
                        <p id='author-error' className='mt-2 text-sm text-red-700'>{errors.author}</p>
                    )}
            </div>
            <div>
                <label htmlFor="content" className='font-semibold'>Content</label>
                <textarea 
                    name="content" 
                    id="content"
                    rows={8}
                    value={values.content}
                    onChange={handleChange}
                    className={fieldClass('content')}
                    required
                    minLength={20}
                    aria-invalid={Boolean(errors.content)}
                    aria-describedby='content-help content-error'/>
                <p id='content-help' className='mt-2 text-sm text-slate-600'>
                Write at least 20 characters.
                </p>    
                <p id='content-error' className='mt-1 text-sm text-red-700'>
                    {errors.content}
                </p>    
            </div>
            <div>
                <label htmlFor="tags" className='font-semibold'>Tags (optional)</label>
                <input 
                    id='tags'
                    name='tags'
                    value={values.tags}
                    onChange={handleChange}
                    className={fieldClass('tags')}
                    placeholder='react, javascript, learning'
                    aria-describedby='tags-help'/>
                <p id='tags-help' className='mt-2 text-sm text-slate-600'>
                    Separate tags with commas.
                </p>    
            </div>
            <div className='flex flex-wrap items-center gap-4'>
                <button
                    type='submit'
                    className='rounded-lg bg-indigo-700 px-5 py-3 font-semibold text-white hover:bg-indigo-800'>
                        {submitLabel}
                </button>  
                <Link to={cancelTo} className='text-slate-700 underline'
                >Cancel
                </Link>  
            </div>
    </form>
  );
}

export default PostForm;