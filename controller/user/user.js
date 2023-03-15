import executeQuery from "../../config/db";
import ErrorHandler from "../../common/errorHandler";


const getAllUsers = async (req, res) => {
  try {
    console.log("all the users");
    //let UserData = await executeQuery("select * from user");
    const UserData = await executeQuery({ query: 'SELECT * FROM users' });
    console.log(UserData);
    res.status(201).json(UserData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const getUserById = async (req, res, next) => {
  let id = req.query.id;
  try {
    console.log("User by id");
    let UserData = await executeQuery({
      query: 'SELECT cus_id, cus_account, cus_last_name, cus_first_name, amount, DATE(date_created) AS con_date FROM users u INNER JOIN customer c ON u.user_id = c.user_id  where u.user_id=?',
      values: [id]
    });
    
    if (UserData.length > 0){ 
      var result = {"error": false, "mess": "user found", "user":UserData};
      console.log(result);
      res.status(200).json(result);
    }else {
      next(new ErrorHandler(`no User found with this id ${id}`, 404));
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUserById = async (req, res, next) => {
  let id = req.query.id;
  try {
    let UserData = await executeQuery(
      "delete from users where user_id=?",
      [id]
    );
    // if (UserData.length > 0) res.status(200).json('User');
    // else {
    //   next(
    //     new ErrorHandler(` User  doesnt exist in db with id ${id}`, 404)
    //   );
    // }
    res.status(200).json("User Deleted Successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

const saveUser = async (req, res) => {
  try {
    var email = req.body.email;
    var fName = req.body.fName;
    var lName = req.body.lName;
    var password = req.body.password;
    var userStatus = req.body.userStatus;
    var phone = req.body.phone;
    var role = req.body.role;
    var account = req.body.account;
    var fund = req.body.fund;
    var cdate = req.body.cdate;

    if (!fName) {
      res.status(400).json(error.details[0].message);
    } else {
      console.log("post request");
      let UserData = await executeQuery({
        query: 'insert into users (email,password,phone,role,userStatus) values(?,?,?,?,?)',
        values: [email, password, phone, role, userStatus],

      });
      var user_id = UserData.insertId;
      let customerId = postCustomer(user_id, account, lName, fName, fund, cdate);
      //cus_id	user_id	cus_account	cus_last_name	cus_first_name	date_created	  
      console.log(customerId);
     // let accountId = postAccount(account, fund, customerId);
      //console.log(accountId);
      var result = await executeQuery({
        query: 'SELECT * FROM users u INNER JOIN customer AS c ON u.user_id = c.user_id WHERE u.user_id=?;',
        values: user_id
      });

      res.status(201).json(result);
    }
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};
const postCustomer = async (user_id, account, lName, fName, fund, cdate) => {
  console.log("post customer");
  try {
    if (user_id) {
      let UserData = await executeQuery({
        query: 'insert into customer (user_id,cus_account,cus_last_name,cus_first_name, amount, date_created) values(?,?,?,?,?,?)',
        values: [user_id, account, lName, fName, fund, cdate],
      });
  console.log("get customer id");
  let cus_id = UserData.insertId;
  console.log("call transaction");

      if(cus_id){
        postTransaction(cus_id, account, lName, fName, fund, cdate);
      }
    }
  } catch (err) {
    console.error(err);
  }
}
const postTransaction = async (cus_id, account, lName, fName, fund, cdate) => {
  console.log("Entering Transactions");
  var name = lName +' ' + fName;
  var address = "admin post";
  var clientAccount = account;
  var clientFund = fund;
  var cus_id = cus_id;
  var ibanNumber = "00000000";
  var description = "account opening balance";
  var trans_status = "successful";
 // var TranxData = [];
 let TranxData = await executeQuery({
        query: 'insert into transaction (cus_id,name,amount,iban_number,trans_date,acct_number, address, description, transaction_status) values(?,?,?,?,?,?,?,?,?)',
        values: [cus_id, name, clientFund, ibanNumber,cdate, clientAccount, address, description, trans_status],
      });
      console.log(TranxData.insertId);
 
}
const updateUser = async (req, res) => {
  let id = req.query.id;
  console.log("id", id);
  const { userName, email, password, phone, userStatus } = req.body;
  console.log("req.body", req.body);
  try {
    let UserData = await executeQuery(
      "select * from users where user_id=?",
      [id]
    );
    if (UserData.length > 0) {
      console.log("putrequest", UserData);
      UserData = await executeQuery(
        `update users set userName=?,email=?,passwrod=?,phone=? where user_id=${id}`,
        [userName, email, password, phone, userStatus]
      );
      res.status(200).json(UserData);
    } else {
      res.status(400).json(`User not found on this id=${id}`);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

export {
  getAllUsers,
  getUserById,
  deleteUserById,
  saveUser,
  updateUser,
};
