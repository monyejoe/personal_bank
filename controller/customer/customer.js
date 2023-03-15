import executeQuery from "../../config/db";
import ErrorHandler from "../../common/errorHandler";


const getAllCustomers = async (req, res) => {
  try {
    console.log("all the Customers");
    //let CustomerData = await executeQuery("select * from Customer");
    const CustomerData = await executeQuery({ query: 'SELECT * FROM customer' });
    console.log(CustomerData);
    res.status(201).json(CustomerData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const getCustomerById = async (req, res, next) => {
  let id = req.query.id;
  try {
    console.log("Customer by id");
    let CustomerData = await executeQuery({
      query: 'SELECT * FROM customer where cus_id=?',
      values: [id]
    });
    
    if (CustomerData.length > 0){ 
      var result = {"error": false, "mess": "Customer found", "customer":CustomerData};
      console.log(result);
      res.status(200).json(result);
    }else {
      next(new ErrorHandler(`no Customer with this id ${id}`, 404));
    }
  } catch (err) {
    console.error(err);
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
    var email = req.body.email;
    var fName = req.body.fName;
    var lName = req.body.lName;
    var password = req.body.password;
    var CustomerStatus = req.body.CustomerStatus;
    var phone = req.body.phone;
    var role = req.body.role;
    var account = req.body.account;
    var fund = req.body.fund;

    if (!fName) {
      res.status(400).json(error.details[0].message);
    } else {
      console.log("post request");
      let CustomerData = await executeQuery({
        query: 'insert into customer (email,password,phone,role,CustomerStatus) values(?,?,?,?,?)',
        values: [email, password, phone, role, CustomerStatus],

      });
      var Customer_id = CustomerData.insertId;
      let customerId = postCustomer(Customer_id, account, lName, fName, fund);
      //cus_id	Customer_id	cus_account	cus_last_name	cus_first_name	date_created	  
      console.log(customerId);
     // let accountId = postAccount(account, fund, customerId);
      //console.log(accountId);
      var result = await executeQuery({
        query: 'SELECT * FROM customer u INNER JOIN customer AS c ON u.Customer_id = c.Customer_id WHERE u.Customer_id=?;',
        values: Customer_id
      });

      res.status(201).json(result);
    }
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};
const postCustomer = async (Customer_id, account, lName, fName, fund) => {
  try {
    if (Customer_id) {
      CustomerData = await executeQuery({
        query: 'insert into customer (Customer_id,cus_account,cus_last_name,cus_first_name, amount) values(?,?,?,?,?)',
        values: [Customer_id, account, lName, fName, fund],
      });
      console.log(CustomerData.insertId);
    }
  } catch (err) {
    console.error(err);
  }
}
const updateCustomer = async (req, res) => {
  console.log("update single customer");
  var cus_id = req.body.cus_id; 
  var trans_date = req.body.trans_date; 
  var fund  = req.body = req.body.fund;

  console.log("req.body", req.body);
  try {
    let CustomerData = await executeQuery({
      query: "select * from customer where cus_id=?",
      values: [cus_id]
  });
    if (CustomerData.length > 0) {
      console.log("putrequest", CustomerData);

      CustomerData = await executeQuery({
        query: "update customer set date_created=?,amount=? where cus_id=?",
        values: [trans_date, fund, cus_id]
    });
      res.status(200).json(CustomerData);
    } else {
      res.status(400).json(`Customer not found on this id=${id}`);
    }
  } catch (err) {
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
