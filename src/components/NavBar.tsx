import HouseFillIcon from "../assets/house-fill.svg";
import FavoritesIcon from "../assets/star-fill.svg";
import UserIcon from "../assets/person-fill.svg";
import AddIcon from "../assets/plus-circle.svg";
import LogoutIcon from "../assets/logout.svg";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../stores/UserStore";

const NavBar = () => {
  const setUserId = useUserStore((state) => state.setUserId);
  const nav = useNavigate();

  const logout = () => {
    setUserId(0);
    localStorage.clear();
    nav("/login");
  };

  return (
    <nav className="flex mb-10">
      <Link className="w-full" to="/">
        <img className="w-16 m-auto" src={HouseFillIcon} alt="House Icon" />
      </Link>
      <Link className="w-full" to="/create-post">
        <img className="w-16 m-auto" src={AddIcon} alt="Add Icon" />
      </Link>
      <Link className="w-full" to="/favorites">
        <img className="w-16 m-auto" src={FavoritesIcon} alt="Star Icon" />
      </Link>
      <Link className="w-full" to="/my-profile">
        <img className="w-16 m-auto" src={UserIcon} alt="Person Icon" />
      </Link>
      <div className="w-full cursor-pointer" onClick={logout}>
        <img className="w-16 m-auto" src={LogoutIcon} alt="Person Icon" />
      </div>
    </nav>
  );
};

export default NavBar;
