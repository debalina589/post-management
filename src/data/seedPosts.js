const samplePosts = [
  {
    id: '1',
    title: 'Getting Started with React',
    author: 'Pritam',
    content:
      'React helps us build user interfaces using reusable components. We can divide a page into smaller pieces such as a header, a form, and a list of cards.',
    tags: ['react', 'beginner'],
  },
  {
    id: '2',
    title: 'Understanding React Props',
    author: 'Priya',
    content:
      'Props pass information from a parent component to a child component. A PostCard can receive a post object and display its title, author, and content.',
    tags: ['react', 'props'],
  },
  {
    id: '3',
    title: 'Working with State',
    author: 'Pritam',
    content:
      'State stores information that can change while a component is displayed. Updating state tells React to render the interface using the new values.',
    tags: ['react', 'state'],
  },
  {
    id: '4',
    title: 'Styling with Tailwind CSS',
    author: 'Rahul',
    content:
      'Tailwind provides utility classes for styling elements. Combining classes for spacing, colours, typography, and layout helps us build consistent interfaces.',
    tags: ['tailwind', 'css'],
  },
  {
    id: '5',
    title: 'Building Responsive Layouts',
    author: 'Priya',
    content:
      'A responsive layout adapts to the available screen width. A card grid can display one column on a phone, two on a tablet, and three on a larger screen.',
    tags: ['css', 'responsive'],
  },
  {
    id: '6',
    title: 'JavaScript Array Methods',
    author: 'Rahul',
    content:
      'Array methods help us work with collections of data. Use map to transform items, filter to select matching items, and find to retrieve one matching item.',
    tags: ['javascript', 'arrays'],
  },
  {
    id: '7',
    title: 'Navigating Between Pages',
    author: 'Priya',
    content:
      'Client-side routing connects URL paths to components. Our post manager has separate routes for listing, creating, viewing, and editing posts.',
    tags: ['react', 'routing'],
  },
  {
    id: '8',
    title: 'Saving Data in localStorage',
    author: 'Pritam',
    content:
      'localStorage stores strings in the browser across page reloads. We can convert an array to JSON when saving it and parse that JSON when loading it.',
    tags: ['javascript', 'storage'],
  },
  {
    id: '9',
    title: 'Why Form Validation Matters',
    author: 'Priya',
    content:
      'Form validation helps users correct missing or invalid information. Clear messages beside the relevant fields explain what needs to change before saving.',
    tags: ['forms', 'validation'],
  },
  {
    id: '10',
    title: 'Writing Accessible Interfaces',
    author: 'Ananya',
    content:
      'Accessible interfaces include meaningful headings, labelled inputs, and visible keyboard focus. Use links for navigation and buttons for actions.',
    tags: ['accessibility', 'html'],
  },
];

export const seedPosts = samplePosts.map((post, index) => {
  const timestamp = new Date(
    Date.UTC(2026, 8, index + 1, 10)
  ).toISOString();

  return {
    ...post,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
});