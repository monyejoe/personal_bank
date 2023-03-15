import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import {
  getMsgById,
  deleteUserById,
  updateMsg,
} from "../../../controller/msg/msg";

const handler = nc({ onError });
handler.get(getMsgById);
handler.delete(deleteUserById);
handler.put(updateMsg);
export default handler;
