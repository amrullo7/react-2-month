import { Link, Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div>
      <div className="">
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
      </div>
      <Outlet/>
    </div>
  )
}

export default Layout