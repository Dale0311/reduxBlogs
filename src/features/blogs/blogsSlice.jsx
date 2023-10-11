import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  blogs: [],
  status: "idle",
  error: null,
};
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  try {
    const res = await axios.get(
      "https://645c8a84250a246ae30744d5.mockapi.io/blogs"
    );
    return res.data;
  } catch (e) {
    return e.message;
  }
});

export const addOneBlog = createAsyncThunk("blogs/addOneblog", async (blog) => {
  try {
    const res = await axios.post(
      "https://645c8a84250a246ae30744d5.mockapi.io/blogs",
      blog
    );
    return res.data;
  } catch (e) {
    return e.message;
  }
});
export const deleteOneBlog = createAsyncThunk(
  "blogs/deleteOneblog",
  async (id) => {
    try {
      const res = await axios.delete(
        "https://645c8a84250a246ae30744d5.mockapi.io/blogs/" + id
      );
      return id;
    } catch (e) {
      return e.message;
    }
  }
);
export const addOneLike = createAsyncThunk("blogs/addOneLike", async (data) => {
  try {
    const { id } = data;
    const res = await axios.put(
      "https://645c8a84250a246ae30744d5.mockapi.io/blogs/" + id,
      data
    );
    return res.data;
  } catch (e) {
    return e.message;
  }
});
export const updateOneBlog = createAsyncThunk(
  "blogs/updateOneblog",
  async (updatedBlog) => {
    try {
      const { id } = updatedBlog;
      const res = await axios.put(
        "https://645c8a84250a246ae30744d5.mockapi.io/blogs/" + id,
        updatedBlog
      );
      return res.data;
    } catch (e) {
      return e.message;
    }
  }
);
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
  extraReducers(builder) {
    builder
      .addCase(fetchBlogs.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "succeded";
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addOneBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      })
      .addCase(deleteOneBlog.fulfilled, (state, action) => {
        const indexOfDeletedBlog = state.blogs.findIndex(
          (blog) => blog.id === action.payload
        );
        state.blogs.splice(indexOfDeletedBlog, 1);
      })
      .addCase(updateOneBlog.fulfilled, (state, action) => {
        const { id } = action.payload;
        const blogs = state.blogs.filter((blog) => blog.id !== id);
        state.blogs = [...blogs, action.payload];
      })
      .addCase(addOneLike.fulfilled, (state, action) => {
        const { id } = action.payload;
        const blogs = state.blogs.filter((blog) => blog.id !== id);
        state.blogs = [...blogs, action.payload];
      });
  },
});

export const selectAllBlogs = (state) => state.blogs.blogs;
export const getBlogsStatus = (state) => state.blogs.status;
export const getBlogsError = (state) => state.blogs.error;
export const { addBlog, deleteBlog, editBlog, addLike } = blogsSlice.actions;
export default blogsSlice.reducer;
