import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import {
  getTransactionById
} from "../../../controller/transaction/tranxbyid";

const handler = nc({ onError });
handler.get(getTransactionById);
export default handler;
