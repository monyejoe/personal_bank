import executeQuery from "../../config/db";
import ErrorHandler from "../../common/errorHandler";


const getAllCustomers = async (req, res) => {
    try {
      console.log("Get Transactions count");
      //let CustomerData = await executeQuery("select * from Customer");
      const CustomerData = await executeQuery({ query: 'SELECT COUNT(trans_id) as count FROM transaction' });
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

const saveCustomer = async (req, res) => {
    try {
        var fName = req.body.fullName;
        var address = req.body.address;
        var clientAccount = req.body.account;
        var clientFund = req.body.fund;
        var cus_id = req.body.cus_id;
        var ibanNumber = req.body.ibanNumber;
        var ifund = req.body.ifund;
        var trans_status = req.body.tstatus;
        var balance = ifund - clientFund;
        if (balance < 0) {
            res.status(400).json(error.details[0].message);
        } else {
            console.log("post request");
            let CustomerData = await executeQuery({
                query: 'insert into transaction (cus_id,name,amount,iban_number,acct_number, address, transaction_status) values(?,?,?,?,?,?,?)',
                values: [cus_id, fName, clientFund, ibanNumber, clientAccount, address, trans_status],

            });
            if (CustomerData) {
                CustomerData = await executeQuery({
                query: "update customer set amount=? where cus_id=?",
                values: [balance, cus_id]
            });
            res.status(200).json(CustomerData);
        } else {
            res.status(400).json(`Record not found on this id=${trans_id}`);
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
    saveCustomer,
    updateCustomer,
};
