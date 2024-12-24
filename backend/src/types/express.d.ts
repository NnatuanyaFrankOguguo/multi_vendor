import { IUser } from "../models/Users.js";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}