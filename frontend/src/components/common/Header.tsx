import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove("all", { path: "/" });

    navigate("/login");
  };

  return (
    <header className="flex items-center gap-5 px-20 py-4 w-full ">
      <Link to={"/"}>Home</Link>
      <Link to={"/dashboard"}>Dashboard</Link>
      <Link to={"/books"}>Books</Link>
      <Link to={"/login"}>Login</Link>
      <Link to={"/signup"}>Sign Up</Link>
      <button onClick={handleLogout}>
        Logout
      </button>
      <Link to={"/profiles"}>Profiles</Link>
    </header>
  );
}

export default Header;
