import useUserStore from "../stores/UserStore";
import PeopleIcon from "../assets/people-fill.svg";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const nav = useNavigate();
  const usernameInput = useRef(document.createElement("input"));
  const passwordInput = useRef(document.createElement("input"));
  const setUserId = useUserStore((state) => state.setUserId);
  const setUsername = useUserStore((state) => state.setUsername);

  const login = async () => {
    const res = await fetch("http://localhost:3000/users");
    const data = await res.json();

    for (const user in data) {
      if (
        data[user].username === usernameInput.current.value &&
        data[user].password === passwordInput.current.value
      ) {
        setUserId(data[user].id);
        setUsername(data[user].username);
        localStorage.setItem("myId", data[user].id);
        localStorage.setItem("myUsername", data[user].username);
        nav("/");
        return;
      }
    }

    alert("Login failed! Please try again.");
  };

  return (
    <div className="my-12">
      <div className="flex flex-col w-1/2 m-auto rounded-xl text-center p-14 space-y-10 text-xl bg-[#191B1D]">
        <img className="w-14 m-auto" src={PeopleIcon} alt="People Icon" />
        <div className="text-4xl font-bold">Welcome Back</div>
        <input
          className="w-4/5 m-auto p-4 rounded-xl outline-none bg-transparent border-2 border-black"
          type="text"
          placeholder="Username"
          ref={usernameInput}
        />
        <input
          className="w-4/5 m-auto p-4 rounded-xl outline-none bg-transparent border-2 border-black"
          type="password"
          placeholder="Password"
          ref={passwordInput}
        />
        <button
          onClick={login}
          className="w-4/5 m-auto py-3 px-8 bg-blue-700 rounded-2xl hover:bg-blue-600"
        >
          Log in
        </button>
        <Link
          className="my-10 text-[#5C5D5E] hover:text-[#707172] underline"
          to={"/signup"}
        >
          Sign up here
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
