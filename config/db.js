import mysql from 'serverless-mysql';


const db = mysql({
  config: {
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "p_bank",
  }
  // config: {
  //   host: "localhost",
  //   user: "anchorof_app",
  //   password: "Ogorfemi@123",
  //   port: 3306,
  //   database: "anchorof_anchor",
  // }
});

export default async function executeQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}

// const { createPool } = require('mysql');
// const pool = createPool({
//     host: "localhost",
//     user: "root",
//     password: "",
//     port: 3306,
//     database: "bank_app",
// });

// pool.getConnection((err) => {
//     if (err) {
//         console.log("Error connecting to db...");
//     }
//     console.log("Connected to db...");
// });

// const executeQuary = (query, arraParams) => {
//     return new Promise((resolve, reject) => {
//         try {
//             pool.query(query, arraParams, (err, data) => {
//                 if (err) {
//                     console.log("error in executing the query");
//                     reject(err);
//                 }
//                 resolve(data);
//             });
//         } catch (err) {
//             reject(err);
//         }
//     });
// };

// module.exports = {executeQuary};