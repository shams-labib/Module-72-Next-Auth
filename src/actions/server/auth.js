"use server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";

export const postUser = async (payload) => {
  console.log(payload);
  //   No-1 Check user exits or not
  const isExit = await dbConnect("users").findOne({ email: payload.email });
  if (isExit) {
    return {
      success: false,
      massage: "user already exit",
    };
  }

  //   hash password
  const hashPassword = await bcrypt.hash(payload.password, 10);

  //   No - 2 Create New User
  const newUser = {
    ...payload,
    createdAt: new Date().toISOString(),
    role: "user",
    password: hashPassword,
  };

  //   No - 3 Send Data in mongodb
  const result = await dbConnect("users").insertOne(newUser);
  if (result.acknowledged) {
    return {
      success: true,
      massage: `User created success ${result.insertedId.toString()}`,
    };
  }
};
