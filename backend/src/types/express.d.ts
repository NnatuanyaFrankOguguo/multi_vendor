import { IUser } from "../models/Users.js";
import  {IStore} from "../models/Store.js"

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      store?: IStore;
    }
  }
}