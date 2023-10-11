import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addLike, editBlog, deleteBlog } from "./blogsSlice";

function Blog() {
  // hooks
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.blogs.find((blog) => blog.id == id)
  );
  const [isEditable, setIsEditable] = useState(false);
  const [editedBlog, setEditedBlog] = useState({
    title: blog.title,
    body: blog.body,
    author: blog.author,
  });

  // var
  const navigate = useNavigate();

  // functions
  const dispatch = useDispatch();

  // add Like
  function handleAddLike() {
    dispatch(addLike(id));
  }

  // edit blog
  function handleChange(e) {
    const { name, value } = e.target;
    setEditedBlog((blog) => ({ ...blog, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editBlog({ id: id, ...editedBlog }));
    setIsEditable(false);
  }

  function handleDelete(e) {
    e.preventDefault();
    dispatch(deleteBlog(id));
    navigate("/blogs");
  }

  if (isEditable) {
    return (
      <form method="post" onSubmit={(e) => handleSubmit(e)}>
        <div className="p-4 space-y-2 border border-gray-700 rounded w-1/2 mx-auto flex flex-col">
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              className="text-3xl font-semibold border p-2 border-gray-500 rounded"
              value={editedBlog.title}
              name="title"
              onChange={(e) => handleChange(e)}
            />
            <textarea
              className="text-lg border border-gray-500 rounded p-2 resize-none"
              name="body"
              onChange={(e) => handleChange(e)}
              value={editedBlog.body}
            ></textarea>
            <p className="text-sm text-gray-500">
              Published by:{" "}
              <input
                type="text"
                name="author"
                className="border border-gray-500 rounded p-2"
                value={editedBlog.author}
                onChange={(e) => handleChange(e)}
              />
            </p>
          </div>
          <div className="space-x-4 self-end flex">
            <button
              className="py-2 px-4 rounded bg-red-500 text-white flex justify-center items-center space-x-2"
              onClick={() => setIsEditable(false)}
            >
              Cancel
            </button>
            <button className="py-2 px-4 rounded bg-green-500 text-white flex justify-center items-center space-x-2">
              Save changes
            </button>
          </div>
        </div>
      </form>
    );
  }

  return (
    <div className="p-4 space-y-2 border border-gray-700 rounded w-1/2 mx-auto">
      <h1 className="text-3xl font-semibold">{editedBlog.title}</h1>
      <p className="text-lg">{editedBlog.body}</p>
      <p className="text-sm text-gray-500">Published by: {editedBlog.author}</p>
      <div className="flex items-center justify-between">
        <button
          className="py-2 px-4 rounded bg-blue-500 text-white flex justify-center items-center space-x-2"
          onClick={handleAddLike}
        >
          <p>{blog.likes}</p>
          <AiOutlineLike />
        </button>
        <div className="text-sm flex space-x-2 underline text-gray-500">
          <button
            className="hover:text-gray-900 cursor-pointer"
            onClick={() => setIsEditable(true)}
          >
            Edit
          </button>
          <button
            className="hover:text-gray-900 cursor-pointer"
            onClick={(e) => handleDelete(e)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default Blog;

// c: delete
// after: create an async thunk
