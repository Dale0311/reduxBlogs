import { Outlet, NavLink, Link } from "react-router-dom";
function Layout() {
  return (
    <div>
      <div className="bg-[#891384] text-white">
        <div className="container mx-auto flex justify-between p-5 items-center">
          <Link to="/">
            <h1 className="text-3xl">Redux Blog</h1>
          </Link>
          <nav>
            <ul className="space-x-4 text-lg">
              <NavLink to={"."}>Home</NavLink>
              <NavLink to={"blogs"}>Blogs</NavLink>
            </ul>
          </nav>
        </div>
      </div>
      <div className="container mx-auto p-5">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
