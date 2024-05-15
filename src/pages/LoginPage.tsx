import useUserStore from "../stores/UserStore";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const nav = useNavigate();
  const usernameInput = useRef(document.createElement("input"));
  const passwordInput = useRef(document.createElement("input"));
  const setUserId = useUserStore((state) => state.setUserId);

  const login = async () => {
    const res = await fetch("http://localhost:3000/users");
    const data = await res.json();

    for (const user in data) {
      if (
        data[user].username === usernameInput.current.value &&
        data[user].password === passwordInput.current.value
      ) {
        setUserId(data[user].id);
        localStorage.setItem("myId", data[user].id);
        nav("/");
        return;
      }
    }

    alert("Login failed! Please try again.");
  };

  return (
    <div className="flex flex-col space-y-10 text-xl">
      <input
        className="w-1/2 m-auto p-4 rounded-xl outline-none bg-transparent border-4 border-black"
        type="text"
        placeholder="Username"
        ref={usernameInput}
      />
      <input
        className="w-1/2 m-auto p-4 rounded-xl outline-none bg-transparent border-4 border-black"
        type="password"
        placeholder="Password"
        ref={passwordInput}
      />
      <button onClick={login} className="w-1/2 m-auto">
        Log in
      </button>
      <Link className="my-10" to={"/signup"}>
        Sign up here
      </Link>
    </div>
  );
};

export default LoginPage;
