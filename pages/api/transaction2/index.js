import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import {
  getAllCustomers,
  saveCustomer,
} from "../../../controller/transaction2/tranx";

const handler = nc(onError);
handler.get(getAllCustomers);
handler.post(saveCustomer);
export default handler;
