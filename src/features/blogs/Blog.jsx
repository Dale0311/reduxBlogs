function Blog({ title, body, likes, author }) {
  return (
    <div className="p-4 space-y-2 border border-gray-700 rounded">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p>{body}</p>
      <p className="text-sm text-gray-500">Published by: {author}</p>
      <button className="py-2 px-4 rounded bg-blue-500 text-white">
        {likes}
      </button>
    </div>
  );
}

export default Blog;
