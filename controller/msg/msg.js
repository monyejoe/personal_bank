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

const getMsgById = async (req, res, next) => {
  let id = req.query.id;
  console.log(id);
  try {
    console.log("Message by id");
    let MsgData = await executeQuery({
      query: 'SELECT message FROM transmsg WHERE id=?',
      values: [id]
    });

    if (MsgData.length > 0) {
      var result = { "error": false, "mess": "msg found", "msg": MsgData };
      console.log(result);
      res.status(200).json(result);
    } else {
      next(new ErrorHandler(`no Message found with this id ${id}`, 404));
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
const saveMsg = async (req, res) => {
  try {
    let id = 1;
    var msg = req.body.msg;
    let UserData = await executeQuery({
      query: `update transmsg set message=? where id=?`,
      values: [msg, id]
  });

    res.status(201).json(UserData);

  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};
const updateMsg = async (req, res) => {
  // let id = req.query.id;
  //console.log("id", id);
  const msg = req.body.msg;
  let id = 1;
  try {
    UserData = await executeQuery(
      `update msg set message=? where id=${id}`,
      [msg]
    );
    res.status(200).json(UserData);

  } catch (err) {
    res.status(400).json(err);
  }
};

export {
  getAllUsers,
  getMsgById,
  deleteUserById,
  saveMsg,
  updateMsg,
};
