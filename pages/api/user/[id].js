import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import {
  getUserById,
  deleteUserById,
  updateUser,
} from "../../../controller/user/user";

const handler = nc({ onError });
handler.get(getUserById);
handler.delete(deleteUserById);
handler.put(updateUser);
export default handler;
