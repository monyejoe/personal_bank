import executeQuery from "../../config/db";
import ErrorHandler from "../../common/errorHandler";


const getAllCustomers = async (req, res) => {
    try {
      console.log("all the Transactions");
      //let CustomerData = await executeQuery("select * from Customer");
      const CustomerData = await executeQuery({ query: 'SELECT * FROM transaction' });
      console.log(CustomerData);
      res.status(201).json(CustomerData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  };
// SELECT COUNT(trans_id) FROM transaction

const getCustomerById = async (req, res, next) => {
    let id = req.query.id;
    try {
        console.log("Customer by id");
        let CustomerData = await executeQuery({
            query: 'SELECT * FROM transaction where trans_id=?',
            values: [id]
        });
        console.log(CustomerData);
        if (CustomerData.length > 0) {
            var result = { "error": false, "mess": "Customer found", "transaction": CustomerData };
            console.log(result);
            res.status(200).json(result);
        } else {
            next(new ErrorHandler(`no Customer found with this id ${id}`, 404));
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteCustomerById = async (req, res, next) => {
    let id = req.query.id;
    try {
        let CustomerData = await executeQuery(
            "delete from customer where Customer_id=?",
            [id]
        );
        // if (CustomerData.length > 0) res.status(200).json('Customer');
        // else {
        //   next(
        //     new ErrorHandler(` Customer  doesnt exist in db with id ${id}`, 404)
        //   );
        // }
        res.status(200).json("Customer Deleted Successfully");
    } catch (err) {
        res.status(500).json(err);
    }
};

const saveTransaction = async (req, res) => {
    try {
        var name = req.body.name;
        var address = "admin post";
        var clientAccount = "0900000000";
        var clientFund = parseInt(req.body.amount);
        var cus_id = req.body.cus_id;
        var ibanNumber = "00000000";
        var ifund = parseInt(req.body.iamount);
        var description = req.body.desc;
        var cdate = req.body.cdate;
        var trans_status = "successful";
        var balance = ifund - clientFund;
        if (balance < 0) {
            res.status(400).json(error.details[0].message);
        } else {
            console.log("post request");
            let CustomerData = await executeQuery({
                query: 'insert into transaction (cus_id,name,amount,iban_number, trans_date,acct_number, address, description, transaction_status) values(?,?,?,?,?,?,?,?,?)',
                values: [cus_id, name, clientFund, ibanNumber, cdate, clientAccount, address, description, trans_status],

            });
            if (CustomerData) {
                CustomerData = await executeQuery({
                query: "update customer set amount=? where cus_id=?",
                values: [balance, cus_id]
            });
            res.status(200).json(CustomerData);
        } else {
            res.status(400).json(`Record not found on this id=${cus_id}`);
        }
               
        }
    } catch (err) {
        //console.error(err);
        res.status(400).json(err);
    }
};
const updateCustomer = async (req, res) => {
    console.log("update single Transaction");
    var trans_id = req.body.trans_id;
    var name = req.body.name;
    var anumber = req.body.acct_number;
    var inumber = req.body.iban_number;
    var address = req.body.address;
    try {
     
        let CustomerData = await executeQuery({
            query: "select * from transaction where trans_id=?",
            values: [trans_id]
        });
        if (CustomerData.length > 0) {
                CustomerData = await executeQuery({
                query: "update transaction set name=?, acct_number=?, iban_number =?, address=? where trans_id=?",
                values: [name, anumber, inumber, address, trans_id]
            });
            res.status(200).json(CustomerData);
        } else {
            res.status(400).json(`Record not found on this id=${trans_id}`);
        }
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};

export {
    getAllCustomers,
    getCustomerById,
    deleteCustomerById,
    saveTransaction,
    updateCustomer,
};
