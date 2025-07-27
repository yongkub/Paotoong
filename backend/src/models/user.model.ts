import { Schema, model, Model, Types } from "mongoose";
import { genSalt, hash, compare } from "bcrypt";

export interface IUser {
  _id: Types.ObjectId;
  username: string;
  password: string;
}

interface UserModel extends Model<IUser> {
  signup(username: string, password: string, confirm: string): Promise<IUser>;
  login(username: string, password: string): Promise<IUser>;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (
  username: string,
  password: string,
  confirm: string
) {
  if (!username || !password || !confirm) {
    throw Error("All fields can't be blank");
  }
  const exist = await this.findOne({ username });
  if (exist) {
    throw Error("The username is already in use");
  }

  if (confirm !== password) {
    throw Error("Passwords do not match");
  }

  const salt = await genSalt(10);
  const hashed = await hash(password, salt);
  const user = await this.create({ username, password: hashed });
  return user;
};

userSchema.statics.login = async function (username: string, password: string) {
  if (!username || !password) {
    throw Error("All fields can't be blank");
  }
  const user = await this.findOne({ username });
  if (!user) {
    throw Error("Incorrect username or password");
  }
  const match = await compare(password, user.password);
  if (!match) {
    throw Error("Incorrect username or password");
  }
  return user;
};

export default model<IUser, UserModel>("User", userSchema);
