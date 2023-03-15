import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import Circle from "../../components/Circle";
import style from "../../styles/Credit.module.css";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import AdminNav from "../../components/AdminNav";

function debitClient(props) {
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [account, setAccount] = useState();
  const [tamount, setTamount] = useState();
  const [tdate, setTdate] = useState();
  const [cdate, setCdate] = useState();
  const [cid, setCid] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_URL + `/api/customer/${props.id}`);
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
    var transaction = [];
    transaction = {
      'cus_id': cid,
      'name': lname + '' + fname,
      'amount': data.credit,
      'iamount': tamount,
      'cdate': data.cdate,
      'desc': data.desc
    }
    let result = await axios.post(
      process.env.NEXT_PUBLIC_URL + `/api/dtransaction`,
      transaction
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
        <h1 className={style.title}>Credit Client</h1>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>

          <input className={style.inputS} type="text" name="lname" value={lname} disabled="true" />

          <input className={style.inputS} type="text" name="fname" value={fname} disabled="true" />
          <input className={style.inputS} value="Balance" disabled="true" />
          <input className={style.inputS} type="text" name="tamount"  value={tamount} disabled="true" />
          <input className={style.inputS} value="Credit Amount" disabled="true" />
          <input className={style.inputS} type="text" name="credit" {...register('credit', { required: true })} />
          <input className={style.inputS} type="text" name="cdate" {...register('cdate', { required: true })} />
          <textarea
            className={style.textArea}
            type="text"
            name="desc"
            rows={2}
            {...register('desc', { required: true })}
            placeholder="Description"
          />
          <button className={style.button} type="submit">DEBIT</button>
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

export default debitClient