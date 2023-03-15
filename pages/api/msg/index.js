import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import {
  getAllUsers,
  saveMsg,
} from "../../../controller/msg/msg";

const handler = nc(onError);
handler.get(getAllUsers);
handler.post(saveMsg);
export default handler;
