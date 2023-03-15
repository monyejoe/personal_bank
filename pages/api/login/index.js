import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import {
  getUserByEmailAndPass,
} from "../../../controller/login/login";

const handler = nc(onError);
handler.post(getUserByEmailAndPass);
export default handler;
