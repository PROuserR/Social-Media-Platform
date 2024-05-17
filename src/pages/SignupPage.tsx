import { useRef } from "react";
import PeopleIcon from "../assets/people-fill.svg";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const nav = useNavigate();
  const usernameInput = useRef(document.createElement("input"));
  const passwordInput = useRef(document.createElement("input"));

  const signup = async () => {
    await fetch(`http://localhost:3000/users/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: usernameInput.current.value,
        password: passwordInput.current.value,
      }),
    });
    nav("/login");
  };

  return (
    <div className="my-12">
      <div className="flex flex-col w-1/2 m-auto rounded-xl text-center p-14 space-y-10 text-xl bg-[#191B1D]">
        <img className="w-14 m-auto" src={PeopleIcon} alt="People Icon" />
        <div className="text-4xl font-bold">Please fill in the form below</div>
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
          onClick={signup}
          className="w-4/5 m-auto py-4 px-8 bg-blue-700 rounded-2xl hover:bg-blue-600"
        >
          Sign up
        </button>
        <Link
          className="my-10 text-[#5C5D5E] hover:text-[#707172] underline"
          to={"/login"}
        >
          Log in here
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
