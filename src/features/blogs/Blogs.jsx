import { useSelector, useDispatch } from "react-redux";
import {
  selectAllBlogs,
  getBlogsStatus,
  getBlogsError,
  fetchBlogs,
} from "./blogsSlice";
import { useEffect } from "react";
import BlogCard from "./BlogCard";
import CreateBlog from "./CreateBlog";
function Blogs() {
  const blogs = useSelector(selectAllBlogs);
  const blogsStatus = useSelector(getBlogsStatus);
  const blogsError = useSelector(getBlogsError);
  const dispatch = useDispatch();
  useEffect(() => {
    if (blogsStatus === "idle") {
      dispatch(fetchBlogs());
    }
  }, [blogsStatus]);

  let content;
  if (blogsStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (blogsStatus === "succeded") {
    content = blogs.map((blog) => {
      return (
        <BlogCard
          key={blog.id}
          id={blog.id}
          title={blog.title}
          blog={blog}
          author={blog.author}
          likes={blog.likes}
        />
      );
    });
  } else if (blogsStatus === "failed") {
    content = <p>{blogsError}</p>;
  }

  return (
    <div className="flex flex-col space-y-2 w-1/2 mx-auto">
      <div className="self-end">
        <CreateBlog />
      </div>
      {content ?? <h1>No blogs yet...</h1>}
    </div>
  );
}

export default Blogs;
