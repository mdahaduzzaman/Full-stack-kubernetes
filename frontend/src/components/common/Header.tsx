import { useUserStore } from "@/lib/store";
import useApi from "@/lib/useApi";
import { Link } from "react-router-dom";

function Header() {
  const { user } = useUserStore();
  const { logout } = useApi();
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="flex items-center justify-between px-20 py-4 w-full border-b">
      <div className="flex gap-5">
        <Link to={"/"}>Home</Link>
        <Link to={"/dashboard"}>Dashboard</Link>
        <Link to={"/books"}>Books</Link>
      </div>
      <div className="flex gap-5">
        {/* if user isn't present showing the Login and Sign Up */}
        {!user.id && (
          <>
            <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>Sign Up</Link>
          </>
        )}
        <Link to={"/profiles"}>Profiles</Link>
        {/* if user is present showing the Logout */}
        {user.id && <button onClick={handleLogout}>Logout</button>}
        {user.first_name && (
          <span>{user.first_name + " " + user.last_name}</span>
        )}
      </div>
    </header>
  );
}

export default Header;
