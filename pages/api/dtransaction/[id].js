import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import {
  getCustomerById,
  deleteCustomerById,
  updateCustomer,
} from "../../../controller/transaction/tranx";

const handler = nc({ onError });
handler.get(getCustomerById);
handler.delete(deleteCustomerById);
handler.put(updateCustomer);
export default handler;
