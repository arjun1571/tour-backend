import { IUser } from "./user.interface";
import { User } from "./user.models";

// create user service
const createUserService = async (payload: Partial<IUser>) => {
  const { name, email } = payload;
  const user = await User.create({ name, email });

  return user;
};

// get all urer servie
const getAllUser = async () => {
  const users = await User.find({});
  const totalUsers = await User.countDocuments();
  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};

export const UserServices = {
  createUserService,
  getAllUser,
};
