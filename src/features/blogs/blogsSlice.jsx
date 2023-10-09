import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  blogs: [
    {
      id: nanoid(),
      title: "how to center a div in js",
      body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, sequi?",
      author: "Dale Cabarle",
      likes: 0,
    },
  ],
  state: "",
  error: null,
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  // addBlog, editBlog, deleteBlog, addLike
  reducers: {
    // title, body, author, implicit likes
    addBlog: (state, action) => {
      const { title, body, author } = action.payload;
      const newBlog = { id: nanoid(), title, body, author, likes: 0 };
      state.blogs.push(newBlog);
    },
    // id
    deleteBlog: (state, action) => {
      state.blogs.filter((blog) => blog.id !== action.payload);
    },
    // autor, body,
    editBlog: (state, action) => {
      state.blogs.map((blog) =>
        blog.id === action.payload.id ? { ...action.updatedBlog } : blog
      );
    },
    addLike: (state, action) => {
      state.blogs.map((blog) =>
        blog.id === action.payload.id ? { ...blog, likes: blog.likes++ } : blog
      );
    },
  },
});

export const selectAllBlogs = (state) => state.blogs.blogs;
export const { addBlog, deleteBlog, editBlog, addLike } = blogsSlice.actions;
export default blogsSlice.reducer;
