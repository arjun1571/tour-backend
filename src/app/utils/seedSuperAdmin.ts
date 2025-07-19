import bcrypt from "bcryptjs";
import { envVars } from "../config/env";
import { IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.models";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({
      email: envVars.SUPER_ADMIN_EMAIL,
    });
    if (isSuperAdminExist) {
      console.log("Super Admin Already Exist");
      return;
    }
    console.log("Trying to create Super Admin");

    const hashPassword = await bcrypt.hash(
      envVars.SUPER_ADMIN_PASSWORD,
      Number(envVars.BCRYPT_SALT_ROUND)
    );

    const authProvider = {
      provider: "credential",
      providerId: envVars.SUPER_ADMIN_EMAIL,
    };

    const payload = {
      name: "Super Admin",
      email: envVars.SUPER_ADMIN_EMAIL,
      password: hashPassword,
      role: Role.SUPER_ADMIN,
      isVerified: true,
      auth: [authProvider],
    };

    const superAdmin = await User.create(payload);
    console.log("Super Admin Create Successfully \n");

    console.log(superAdmin);
  } catch (error) {
    console.log(error);
  }
};
