import bcrypt from "bcrypt";
import jws from "jws";
import { CallbackWithoutResultAndOptionalError, Document, Model, Schema, model } from "mongoose";
import { User as UMod, UserRef } from "shapes";

export interface IUserDoc extends Document<string>, UMod {}

// more or less used to pull the userId out of the token. this allows us to
// const tokenParsed = decodeToken(sanitizedPayload.token);
// const foundUser = await User.findById(tokenParsed.payload);
export const decodeToken = (token: string) => {
  return jws.decode(token).payload;
};

export const createToken = async (encodedUserId: string) =>
  jws.sign({
    header: { alg: "HS256" },
    payload: encodedUserId,
    secret: process.env.JWT_SECRET || "has a van",
  });

export const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    required: true,
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zip: {
    type: String,
  },
});

export const authenticate = async function (username: string, password: string) {
  const foundUser = await User.findOne({ username });
  if (!foundUser) {
    throw new Error(`There's no one by the handle ${username} here. Odd...`);
  }
  const isCorrect = await bcrypt.compare(password, foundUser.password);
  if (!isCorrect) {
    throw new Error("Looks like you may have forgotten your password...");
  }
  return foundUser;
};

UserSchema.pre("save", function (this: IUserDoc, next: CallbackWithoutResultAndOptionalError) {
  if (!this.isModified("password")) {
    next();
    return;
  }
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

export const User = model<IUserDoc, Model<IUserDoc>>(UserRef, UserSchema);
