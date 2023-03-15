import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import {
  getAllUsers,
  saveUser,
} from "../../../controller/user/user";

const handler = nc(onError);
handler.get(getAllUsers);
handler.post(saveUser);
export default handler;
