import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  blogs: [
    {
      id: "gRePQj7hAIvhUH6_Dsoe0",
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
      const toDelete = state.blogs.findIndex(
        (blog) => blog.id === action.payload
      );
      if (toDelete !== -1) {
        state.blogs.splice(toDelete, 1);
      }
    },
    // author, body, title, id
    editBlog: (state, action) => {
      const { title, body, author, id } = action.payload;
      const toUpdate = state.blogs.find((blog) => blog.id == id);
      if (toUpdate) {
        toUpdate.title = title;
        toUpdate.body = body;
        toUpdate.author = author;
      }
    },
    addLike: (state, action) => {
      state.blogs.map((blog) =>
        blog.id === action.payload ? { ...blog, likes: blog.likes++ } : blog
      );
    },
  },
});

export const selectAllBlogs = (state) => state.blogs.blogs;
export const { addBlog, deleteBlog, editBlog, addLike } = blogsSlice.actions;
export default blogsSlice.reducer;
