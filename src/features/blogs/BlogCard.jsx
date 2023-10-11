import { AiOutlineLike } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addLike } from "./blogsSlice";
import { Link } from "react-router-dom";
function BlogCard({ title, likes, author, id }) {
  const dispatch = useDispatch();
  function handleAddLike() {
    dispatch(addLike(id));
  }
  return (
    <div className="p-4 space-y-2 border border-gray-700 rounded">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="text-sm text-gray-500">Published by: {author}</p>
      <div className="flex items-center justify-between">
        <button
          className="py-2 px-4 rounded bg-blue-500 text-white flex justify-center items-center space-x-2"
          onClick={handleAddLike}
        >
          <p>{likes}</p>
          <AiOutlineLike />
        </button>
        <div className="text-sm flex space-x-2 underline text-gray-500">
          <Link className="hover:text-gray-900 cursor-pointer" to={`${id}`}>
            view
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
