import HouseFillIcon from "../assets/house-fill.svg";
import FavoritesIcon from "../assets/star-fill.svg";
import AddIcon from "../assets/plus-circle.svg";
import LogoutIcon from "../assets/logout.svg";
import PeopleIcon from "../assets/people-fill.svg";
import PostIcon from "../assets/sticky-fill.svg";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../stores/UserStore";

const NavBar = () => {
  const setUserId = useUserStore((state) => state.setUserId);
  const username = useUserStore((state) => state.username);
  const setUsername = useUserStore((state) => state.setUsername);
  const nav = useNavigate();

  const logout = () => {
    setUserId(0);
    setUsername("");
    localStorage.clear();
    nav("/login");
  };

  return (
    <nav className="bg-[#191B1D]">
      <div className="flex p-4 w-full items-center space-x-8 bg-[#5C5D5E]">
        <img className="w-12 h-11" src={PeopleIcon} alt="People Icon" />
        <span className="text-2xl w-full text-center">
          Social Media Platform
        </span>
      </div>
      <div className="flex flex-col w-full h-full">
        <div className="px-2 py-6 text-[#5C5D5E] space-y-2">
          <Link
            className="w-full px-6 py-3 hover:text-white rounded-xl space-x-6 flex items-center"
            to="/"
          >
            <img className="w-8 h-8" src={HouseFillIcon} alt="House Icon" />
            <span>Feed</span>
          </Link>
          <Link
            className="w-full px-6 py-3 hover:text-white rounded-xl space-x-6 flex items-center"
            to="/create-post"
          >
            <img className="w-8 h-8" src={AddIcon} alt="Add Icon" />
            <span>Add Post</span>
          </Link>
          <Link
            className="w-full px-6 py-3 hover:text-white rounded-xl space-x-6 flex items-center"
            to="/favorites"
          >
            <img className="w-8 h-8" src={FavoritesIcon} alt="Star Icon" />
            <span>Favorties</span>
          </Link>
          <Link
            className="w-full px-6 py-3 hover:text-white rounded-xl space-x-6 flex items-center"
            to="/my-posts"
          >
            <img className="w-8 h-8" src={PostIcon} alt="Post Icon" />
            <span>My Posts</span>
          </Link>
        </div>

        <div className="flex mt-[96%] w-full px-6 items-center">
          <span className="m-auto font-bold">{username}</span>
          <img
            className="w-8 h-8 m-auto cursor-pointer"
            onClick={logout}
            src={LogoutIcon}
            alt="Logout Icon"
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
