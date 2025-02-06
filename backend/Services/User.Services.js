import userModel from '../models/user.model.js';

//create user custom function
export const createUser = async ({ firstname, lastname, email, password }) => {
  try {
    // Check if all fields are provided
    if (!firstname || !email || !password) {
      throw new Error('All fields are required');
    }
    const user = await userModel.create({
      fullname: {
        firstname,
        lastname
      },
      email,
      password
    });
    return user;
  } catch (error) {
   return new Error(error.message);
  }
};
