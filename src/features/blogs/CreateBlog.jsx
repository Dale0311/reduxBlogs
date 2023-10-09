import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "./blogsSlice";

function CreateBlog() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: "", body: "", author: "" });
  function handleChange(e) {
    const { name, value } = e.target;
    setNewBlog((blog) => ({ ...blog, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addBlog(newBlog));
    setNewBlog({ title: "", body: "", author: "" });
    setShowModal(false);
  }
  return (
    <div>
      <button
        className="py-2 px-4 text-white rounded bg-blue-500 hover:bg-blue-600"
        onClick={() => setShowModal(true)}
      >
        create new blog
      </button>
      {showModal && (
        <>
          <form
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onSubmit={(e) => handleSubmit(e)}
            method="post"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="w-full p-4">
                  {/* title */}
                  <label
                    htmlFor="UserTitle"
                    className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                  >
                    <input
                      name="title"
                      type="text"
                      id="UserTitle"
                      placeholder="Title"
                      className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      value={newBlog.title}
                      onChange={(e) => handleChange(e)}
                    />

                    <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      Title
                    </span>
                  </label>
                </div>
                <div className="relative p-6 flex-auto">
                  {/* body */}
                  <label
                    htmlFor="body"
                    className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                  >
                    <textarea
                      name="body"
                      id="body"
                      placeholder="Body"
                      className="peer resize-none h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      cols="50"
                      rows="10"
                      value={newBlog.body}
                      onChange={(e) => handleChange(e)}
                    />

                    <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      Body
                    </span>
                  </label>
                </div>
                <div className="relative p-6 flex-auto">
                  {/* author */}
                  <label
                    htmlFor="author"
                    className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                  >
                    <input
                      type="text"
                      id="author"
                      placeholder="author"
                      cols="30"
                      rows="10"
                      name="author"
                      className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      value={newBlog.author}
                      onChange={(e) => handleChange(e)}
                    />

                    <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      Author
                    </span>
                  </label>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </div>
  );
}
import React from "react";

export default CreateBlog;
