import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import Circle from "../../components/Circle";
import style from "../../styles/Contact.module.css";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import ClientNav from "../../components/ClientNav";

function tranx({ data }) {

  const [tstatus, setTstatus] = useState(data.transaction[0].transaction_status);

  console.log(data.transaction[0]);

  const { handleSubmit, register, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = async (d) => {
    const tid = data.transaction[0].trans_id;
    var tranx = [];
    tranx = {
      'trans_id': tid,
      'name': d.name,
      'acct_number': d.anumber,
      'address': d.address,
      'iban_number': d.inumber
    }
    let result = await axios.put(
      process.env.NEXT_PUBLIC_URL +`/api/clitranx/${tid}`, tranx
    );
    if (result) {
      router.push('/dashboard');
    }
  }

  return (
    <>
      <ClientNav />
      <div className={style.container}>
        <Circle backgroundColor="green" left="-40vh" top="-20vh" className={style.circle} />
        <Circle backgroundColor="yellow" right="-30vh" bottom="-60vh" className={style.circle} />
        <h1 className={style.title}>Update Transaction</h1>

        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <input className={style.inputL} type="text" name="name" defaultValue={data.transaction[0].name}  {...register('name', { required: true })} />
          <label className="form-label">Client Name</label>
          <input className={style.inputL} type="text" name="inumber" defaultValue={data.transaction[0].iban_number} {...register('inumber', { required: true })}/>
          <label className="form-label">Iban Number</label>
          <input className={style.inputL} type="text" name="anumber" defaultValue={data.transaction[0].acct_number} {...register('anumber', { required: true })} />
          <label className="form-label">Account Number</label>
          <textarea
            className={style.textArea}
            type="text"
            name="address"
            rows={6}
            {...register('address', { required: true })}
            placeholder="Bank Address"
            defaultValue={data.transaction[0].address}
          />
          {errors.address && <span style={{ fontSize: "0.8em", color: "red" }}>Address is required</span>}

           <label className="form-label">Address</label>

          <button className={style.button} type="submit">SAVE</button>

        </form>
      </div>
    </>
  )
}
export async function getServerSideProps(context) {
  console.log('id is ' + context.query.id)
  var user_id = context.query.id
  const res = await fetch(process.env.NEXT_PUBLIC_URL +`/api/transaction/${user_id}`);
  const data = await res.json();
  return {
    props: { data }
  }
}

export default tranx