import { User } from "../user/user.model.js";
import { hashPassword, comparePassword } from "../../utils/bcrypt.js";
import { createToken } from "../../utils/jwt.js";
import type {
  RegisterInput,
  LoginInput,
} from "./auth.interface.js";

export const registerUser = async (
  payload: RegisterInput
) => {
  const { name, email, phone, password } = payload;

  if (email) {
    const existingEmail = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingEmail) {
      throw new Error("Email already registered");
    }
  }

  if (phone) {
    const existingPhone = await User.findOne({ phone });

    if (existingPhone) {
      throw new Error("Phone number already registered");
    }
  }

  const passwordHash = await hashPassword(password);

  const user = await User.create({
    name,
    email: email?.toLowerCase(),
    phone,
    passwordHash,
    role: "USER",
  });

  const token = createToken({
    userId: user._id.toString(),
    role: user.role,
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
    token,
  };
};

export const loginUser = async (
  payload: LoginInput
) => {
  const { email, phone, password } = payload;

  const query = email
    ? { email: email.toLowerCase() }
    : { phone };

  const user = await User.findOne(query).select(
    "+passwordHash"
  );

  if (!user) {
    throw new Error("Invalid email/phone or password");
  }

  const isPasswordCorrect = await comparePassword(
    password,
    user.passwordHash
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid email/phone or password");
  }

  const token = createToken({
    userId: user._id.toString(),
    role: user.role,
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
    token,
  };
};

export const getMe = async (userId: string) => {
  const user = await User.findById(userId).select(
    "-passwordHash"
  );

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};