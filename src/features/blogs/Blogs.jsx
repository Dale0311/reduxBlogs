import { useSelector } from "react-redux";
import { selectAllBlogs } from "./blogsSlice";
import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
function Blogs() {
  const blogs = useSelector(selectAllBlogs);
  const toRenderBlogs = blogs.map((blog) => {
    return (
      <Blog
        key={blog.id}
        title={blog.title}
        body={blog.body}
        author={blog.author}
        likes={blog.likes}
      />
    );
  });
  return (
    <div className="flex flex-col space-y-2">
      <div className="self-end">
        <CreateBlog />
      </div>
      {toRenderBlogs}
    </div>
  );
}

export default Blogs;
