import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import Circle from "../../components/Circle";
import style from "../../styles/Contact.module.css";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import AdminNav from "../../components/AdminNav";

function updateUser(props) {
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [account, setAccount] = useState();
  const [tamount, setTamount] = useState();
  const [tdate, setTdate] = useState();
  const [cid, setCid] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_URL +`/api/customer/${props.id}`);
      const user = await res.json();
      console.log(user.customer[0]);
      setLname(user.customer[0].cus_last_name);
      setFname(user.customer[0].cus_first_name);
      setAccount(user.customer[0].cus_account);
      setTamount(user.customer[0].amount);
      setTdate(user.customer[0].date_created);
      setCid(user.customer[0].cus_id);
      return {
        props: { user },
      };
    };
    fetchData();
  }, [])
  const { handleSubmit, register, formState: { errors } } = useForm();
  const router = useRouter();
  const onSubmit = async (data) => {

    var customer = [];

    customer = {
      'cus_id': cid,
      'trans_date': data.tdate,
      'fund': data.tamount
    }
//https://anchor.phfeld.com.ng/api/user/6
    let result = await axios.put(
      process.env.NEXT_PUBLIC_URL +`/api/customer/${cid}`,
      customer
    );
    if (result) {
      router.push('/admin/adminPage');
    }
  }

  return (
    <>
    <AdminNav />
    <div className={style.container}>
      <Circle backgroundColor="green" left="-40vh" top="-20vh" className={style.circle} />
      <Circle backgroundColor="yellow" right="-30vh" bottom="-60vh" className={style.circle} />
      <h1 className={style.title}>Update Client</h1>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>

        <input className={style.inputS} type="text" value={lname} disabled="true" />

        <input className={style.inputS} type="text" value={fname} disabled="true" />

        <input className={style.inputL} type="text" value={account} disabled="true" />
        <label className="form-label">Account Number</label>

        <input className={style.inputL} type="text" name="tamount" {...register('tamount', { required: true })} defaultValue={tamount} onChange={(e) => setTamount({ tamount: e.target.value })} />
        <label className="form-label">Amount</label>
        <input className={style.inputL} type="text" name="tdate" {...register('tdate', { required: true })} defaultValue={tdate} onChange={(e) => setTamount({ tdate: e.target.value })} />

        <label className="form-label">Transaction Date</label>

        <button className={style.button} type="submit">SAVE</button>
      </form>
    </div>
    </>
  )
}

export const getServerSideProps = (context) => {
  console.log('id is ' + context.query.id)
  var user_id = context.query.id
  return {
    props: {
      id: user_id
    }
  }
}

export default updateUser