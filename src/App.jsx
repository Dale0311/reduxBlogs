import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
// components
import Layout from "./components/layouts/Layout";
import Blogs from "./features/blogs/Blogs";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<h1>Hello from home </h1>} />
        <Route path="blogs" element={<Blogs />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
