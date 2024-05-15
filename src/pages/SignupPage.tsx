import { useRef } from "react";
import useUserStore from "../stores/UserStore";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const nav = useNavigate();
  const usernameInput = useRef(document.createElement("input"));
  const passwordInput = useRef(document.createElement("input"));
  const setUserId = useUserStore((state) => state.setUserId);

  const signup = async () => {
    const res = await fetch(`http://localhost:3000/users/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: usernameInput.current.value,
        password: passwordInput.current.value,
      }),
    });
    const data = await res.json();
    setUserId(data.id);
    nav("/");
  };

  return (
    <div className="flex flex-col space-y-10 text-xl">
      <div className="text-4xl">
        To create a new account fill in the form below:
      </div>
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
      <button onClick={signup} className="w-1/2 m-auto">
        Sign up
      </button>
      <Link className="my-10" to={"/login"}>
        Log in here
      </Link>
    </div>
  );
};

export default SignupPage;
