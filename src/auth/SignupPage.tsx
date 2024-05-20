import PeopleIcon from "../assets/people-fill.svg";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema, FormFields } from "../validations/UserValidation";
import { useForm, SubmitHandler } from "react-hook-form";

const SignupPage = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: yupResolver(userSchema),
  });

  const signup: SubmitHandler<FormFields> = async (inputData) => {
    const formData = {
      username: inputData.username,
      password: inputData.password,
    };

    const isFormValid = await userSchema.isValid(formData);

    if (isFormValid) {
      await fetch(`http://localhost:3000/users/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: inputData.username,
          password: inputData.password,
        }),
      });
      nav("/login");
    }
  };

  return (
    <div className="my-12">
      <div className="flex flex-col w-1/2 m-auto rounded-xl text-center p-14 space-y-10 text-xl bg-[#191B1D]">
        <img className="w-14 m-auto" src={PeopleIcon} alt="People Icon" />
        <div className="text-4xl font-bold">Please fill in the form below</div>
        <form
          className="flex flex-col space-y-10"
          onSubmit={handleSubmit(signup)}
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
            Sign Up
          </button>
        </form>
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
