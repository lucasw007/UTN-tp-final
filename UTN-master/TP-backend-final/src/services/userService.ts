import User, { IUser } from '../models/userModel';
import jwt from 'jsonwebtoken';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginResult {
  token: string;
  userId: string;
  email: string;
}

const userService = {
  registerUser: async (data: RegisterData): Promise<IUser> => {
    const newUser = new User(data);
    return await newUser.save();
  },

  loginUser: async (email: string, password: string): Promise<LoginResult | null> => {
    const user = await User.findOne({ email });
    if (!user) return null;

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return null;

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRATION || '1d' });

    return { token, userId: user._id.toString(), email: user.email };
  },

  getUserById: async (id: string): Promise<IUser | null> => {
    return await User.findById(id).select('-password');
  }
};

export default userService;