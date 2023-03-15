import React from 'react'
import style from "../styles/Dashboard.module.css";
import Image from "next/image";
import axios from "axios";
import Circle from "../components/Circle";
import { useEffect, useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from "next/link";
import ClientNav from "../components/ClientNav";

function dashboard({ tran }) {
  const router = useRouter();
  const [user, setUser] = useState();
  const [transact, setTransact] = useState();
  const [mess, setMess] = useState("");
  const [name, setName] = useState();
  const [cid, setCid] = useState();
  const [account, setAccount] = useState();
  const [fund, setFund] = useState();
  const [cdate, setCdate] = useState();
  const [tdate, setTdate] = useState();
  const [date, setDate] = useState();
  const [message, setMessage] = useState("");

  const { handleSubmit, register, formState: { errors } } = useForm();

  useEffect(() => {

    const fetchData = async () => {
      // setMess("");
      // var msg_id = 1;
      const singleUser = JSON.parse(localStorage.getItem('user'));
      setUser(singleUser[0].user_id);
      const res = await fetch(process.env.NEXT_PUBLIC_URL + `/api/user/${singleUser[0].user_id}`);
      const user = await res.json();
      console.log(user.user[0]);
      setName(user.user[0].cus_last_name + ',' + user.user[0].cus_first_name);
      setAccount(user.user[0].cus_account);
      setTdate(user.user[0].con_date);
      setFund(user.user[0].amount);
      setCid(user.user[0].cus_id);
      const trans = await fetch(process.env.NEXT_PUBLIC_URL + `/api/transbycusid/${user.user[0].cus_id}`);
      const tranx = await trans.json();
      console.log(tranx.transaction);
      setTransact(tranx.transaction);
      // const msg = await fetch(process.env.NEXT_PUBLIC_URL +`/api/msg/${msg_id}`);
      // const msgs = await msg.json();
      // console.log(msgs.msg[0].message);
      // var ts = msgs.msg[0].message;
      // console.log(ts);
      // setMess(ts);

      return {
        props: { user },
      };
      // const result = axios.get(
      //   `http://localhost:3000/api/user/${user[0].user_id}` 
      // );
      // console.log(result);
    };
    fetchData();
    console.log(transact);
    // console.log(result.status);
    // console.log(result);
  }, [cid])
  console.log(transact);

  //   useEffect(() => {
  //     const fetchTrans = async () => {
  //   console.log(cid);
  //   const res = await fetch(`http://localhost:3000/api/transaction/${cid}`);
  //   const trans = await res.json();
  //   return {
  //     props: { trans }
  //   }
  // };
  // fetchTrans();
  // }, [trans])

  const onSubmit = async (data) => {
    setMess("");
    var msg_id = 1;
    const msg = await fetch(process.env.NEXT_PUBLIC_URL + `/api/msg/${msg_id}`);
    const msgs = await msg.json();
    console.log(msgs.msg[0].message);
    var ts = msgs.msg[0].message;
    console.log(ts);
    setMess(ts);
    var tdate = new Date();
    var sdate = tdate.getDate() + "/" + (tdate.getMonth() + 1) + "/" + tdate.getFullYear();
    setCdate(sdate);
    var transaction = [];
    transaction = {
      'ibanNumber': data.ibanNumber,
      'address': data.address,
      'fund': data.clientFund,
      'fullName': data.fullName,
      'account': data.clientAccount,
      'cdate': sdate,
      'cus_id': cid,
      'ifund': fund,
      'tstatus': ts
    }
    let result = await axios.post(
      process.env.NEXT_PUBLIC_URL + `/api/transaction`,
      transaction
    );
    transaction = "";
     console.log(result);
    // if (result) {
    //   if(mess == "blocked"){
    //   setMessage(`<span style={{ paddingRight: "20px", fontSize: "1em", color: "red", fontWeight: "bold" }}>Transfer Blocked!</span>`)
    //   router.push('/dashboard');
    //   }else{
    //     setMessage(`<span style={{ paddingRight: "20px", fontSize: "1em", color: "green", fontWeight: "bold" }}>Transfer ${mess}, please note that it will take 2 to 3 working days to effect!</span>`)
    //     router.push('/dashboard');
    //   }
    // }

  }

  return (
    <>
      <ClientNav />
      <div className={style.container}>
        {/* <div className={`${style.circle} ${style.circle1}`} />
    <div className={`${style.circle} ${style.circle2}`} /> */}
        <Circle backgroundColor="#01c686" top="-45vh" left="-45vh" />
        {/* <Circle backgroundColor="#01c686" right="-40vh" /> */}
        <div className={style.card}>
          <h1 className={style.title}>
            Welcome:  <span className={style.brandName}>{name}</span>
          </h1>

        </div>
        <div className={style.card2}><br />
          <p className={style.desc}>
            Account number:  {account}</p> <br /> <p style={{ fontSize: "25px" }}>Balance:  ${fund} </p>
          <p>
            <button type="button" style={{ fontSize: "25px" }} className="btn btn-primary tbt" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Initiate Transfar
            </button> </p>
        </div>
      </div>
      <div className='containers' style={{ paddingTop: 0, margingTop: 0, }}>

        <div className="card" style={{ paddingTop: 0, width: '100%' }}>
          <h5 className="card-header">Transactions</h5>
          <div className="card-body">
            {/* <p className="card-text">Account funded on:-
              {
                tdate
              }
            </p> */}

          </div>
          {transact ?
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>

                  <th scope="col">Description</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Transaction Date</th>
                  {/* <th scope="col">Edit</th> */}

                </tr>
              </thead>
              <tbody>
                {transact.map(function (d, idx) {
                  return (<tr>
                    <th scope="row">{idx + 1}</th>

                    <td>{d.description}</td>
                    <td>{d.amount}</td>
                    <td>{d.trans_date}</td>
                    {/* <Link
                      href={{
                        pathname: `/clitranx/[id]`,
                        query: {
                          id: d.trans_id,
                        },
                      }}
                      as={`/clitranx/${d.trans_id}`} >
                      <td style={{ cursor: "pointer" }}> <i class="bi bi-pencil-fill"></i> </td>
                    </Link> */}
                  </tr>)
                })}
              </tbody>
            </table>

            : ''}

        </div>
      </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Transfer Fund</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h6>
                <div className="card" style={{ paddingTop: 0, width: '100%' }}>

                  {mess ? mess == "blocked" ?
                    <span style={{ paddingRight: "20px", textAlign: "center", fontSize: "1em", color: "red", fontWeight: "bold" }}>Transfer Blocked! Please contact support@anchoroffshore.com</span>
                    :
                    <span style={{ paddingRight: "20px", textAlign: "center", fontSize: "1em", color: "green", fontWeight: "bold" }}>Transfer {mess}, please note that it will take 2 to 3 working days to effect!</span>
                    : ''
                  }
                </div>
              </h6>
              <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <input className={style.inputL} type="text" name="name" value={name} hidden="true" />
                <input className={style.inputS} type="text" name="ibanNumber" {...register('ibanNumber', { required: true })} placeholder="IBAN Number/Swift Code " />
                {errors.ibanNumber && <span style={{ fontSize: "0.8em", color: "red" }}>IBAN Number is required</span>}

                <input className={style.inputL} type="text" name="fullName" {...register('fullName', { required: true })} placeholder="Full Name" />
                {errors.fullName && <span style={{ fontSize: "0.8em", color: "red" }}>Full Name is required</span>}
                <input className={style.inputL} type="text" name="clientAccount" {...register('clientAccount', { required: true })} placeholder="Your Account Number" />
                {errors.clientAccount && <span style={{ fontSize: "0.8em", color: "red" }}>Full Name is required</span>}
                <textarea
                  className={style.textArea}
                  type="text"
                  name="address"
                  rows={6}
                  {...register('address', { required: true })}
                  placeholder="Bank Address"
                />
                {errors.address && <span style={{ fontSize: "0.8em", color: "red" }}>Address is required</span>}

                <input className={style.inputL} type="text" name="clientFund" {...register('clientFund', { required: true })} placeholder="Amount to transfer" />
                {errors.clientFund && <span style={{ fontSize: "0.8em", color: "red" }}>Amount is required</span>}

                {/* <button className={style.button2} type="submit">SUBMIT</button> */}
                <button type="submit" className={style.button2}>Transfer</button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// export async function getServerSideProps(cid){
//   console.log(cid);
//   const res = await fetch(`http://localhost:3000/api/transaction/${cus_id}`);
//   const trans = await res.json();
//   return {
//     props: { trans }
//   }
// }
export default dashboard