import  executeQuery  from "../../config/db";
import ErrorHandler from "../../common/errorHandler";


const getUserByEmailAndPass = async (req, res, next) => {
  try {
    var email = req.body.email;
    var password = req.body.password;
  
    if (!email) {
      res.status(400).json(error.details[0].message);
    } else {
      console.log("search user with email and password");

      let UserData = await executeQuery({
        query:  'select * from users where email=(?) && password=(?)',
        values: [email, password ],
    });
        if(UserData.length >0){
            var result = {"error": false, "mess": "user found", "user":UserData};
            res.status(200).json(result);
        }else{
            var result = {"error": true, "mess": "user not found"};
            res.status(211).json(result);
        }
            var result = {"error": true, "mess": "error in query"};
            res.status(215).json(result);
    }
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};


export {
   getUserByEmailAndPass,
};
