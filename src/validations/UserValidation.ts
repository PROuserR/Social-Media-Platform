import { object, string } from "yup";

export type FormFields = {
  username: string;
  password: string;
};

export const userSchema = object({
  username: string().required("Username is required."),
  password: string().min(4).required("Password is required."),
});
