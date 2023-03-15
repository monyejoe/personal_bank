import executeQuery from "../../config/db";
import ErrorHandler from "../../common/errorHandler";


const getTransactionById = async (req, res, next) => {
    let id = req.query.id;
   let tstatus = "blocked";
    try {
        console.log("Transaction by Cus id");
        let CustomerData = await executeQuery({
            query: 'SELECT * FROM transaction where cus_id=? AND transaction_status!=?',
            values: [id, tstatus]
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
export { getTransactionById };
