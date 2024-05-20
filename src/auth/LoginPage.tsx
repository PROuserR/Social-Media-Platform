import useUserStore from "../stores/UserStore";
import PeopleIcon from "../assets/people-fill.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { userSchema, FormFields } from "../validations/UserValidation";
import { useForm, SubmitHandler } from "react-hook-form";

const LoginPage = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: yupResolver(userSchema),
  });
  const setUserId = useUserStore((state) => state.setUserId);
  const setUsername = useUserStore((state) => state.setUsername);

  const login: SubmitHandler<FormFields> = async (inputData) => {
    const res = await fetch("http://localhost:3000/users");
    const data = await res.json();

    for (const user in data) {
      if (
        data[user].username === inputData.username &&
        data[user].password === inputData.password
      ) {
        setUserId(data[user].id);
        setUsername(data[user].username);
        localStorage.setItem("myId", data[user].id);
        localStorage.setItem("myUsername", data[user].username);
        nav("/");
      }
    }
  };

  return (
    <div className="my-12">
      <div className="flex flex-col w-1/2 m-auto rounded-xl text-center p-14 space-y-10 text-xl bg-[#191B1D]">
        <img className="w-14 m-auto" src={PeopleIcon} alt="People Icon" />
        <div className="text-4xl font-bold">Welcome Back</div>
        <form
          className="flex flex-col space-y-10"
          onSubmit={handleSubmit(login)}
        >
          <input
            className="w-4/5 m-auto p-4 rounded-xl outline-none bg-transparent border-2 border-black"
            type="text"
            placeholder="Username"
            {...register("username")}
          />
          {errors.username && (
            <span className="text-red-400">{errors.username.message}</span>
          )}
          <input
            className="w-4/5 m-auto p-4 rounded-xl outline-none bg-transparent border-2 border-black"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-400">{errors.password.message}</span>
          )}
          <button className="w-4/5 m-auto py-3 px-8 bg-blue-700 rounded-2xl hover:bg-blue-600">
            Log in
          </button>
        </form>

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
