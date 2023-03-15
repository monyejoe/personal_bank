import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import {
  getAllCustomers,
  saveTransaction,
} from "../../../controller/dtransaction/tranx";

const handler = nc(onError);
handler.get(getAllCustomers);
handler.post(saveTransaction);
export default handler;
