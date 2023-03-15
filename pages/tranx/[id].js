import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import Circle from "../../components/Circle";
import style from "../../styles/Contact.module.css";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import AdminNav from "../../components/AdminNav";

function tranx({data}) {
 
  const [tstatus, setTstatus] = useState(data.transaction[0].transaction_status);
 
  console.log(data.transaction[0]);
  
  const { handleSubmit, register, formState: { errors } } = useForm();
  const router = useRouter();
 
  const onSubmit = async (d) => {
    console.log("we are here...");
    console.log(d.tstatus);
    const tid = data.transaction[0].trans_id;
    var tranx = [];
    tranx = {
      'trans_id': tid,
      'tstatus': d.tstatus
    }
    let result = await axios.put(
      process.env.NEXT_PUBLIC_URL +`/api/transaction/${tid}`, tranx
    );
    if (result) {
      router.push('/admin/adminPage');
    }
  }

  return (
    <> 
    <AdminNav/>
    <div className={style.container}>
      <Circle backgroundColor="green" left="-40vh" top="-20vh" className={style.circle} />
      <Circle backgroundColor="yellow" right="-30vh" bottom="-60vh" className={style.circle} />
      <h1 className={style.title}>Update Transaction Status</h1>

      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <input className={style.inputL} type="text" value={data.transaction[0].name} disabled />
        <label className="form-label">Client Name</label>
        <input className={style.inputL} type="text" value={data.transaction[0].acct_number} disabled />
        <label className="form-label">Account Number</label>

        <input className={style.inputL} type="text" value={data.transaction[0].trans_date} disabled />

        <label className="form-label">Transaction Date</label>
              
        <select className={style.inputL} type="text" name="tstatus" {...register('tstatus', { required: true })} defaultValue={tstatus}  onChange={(e) => setTstatus({ tstatus: e.target.value })} >
        <option>{data.transaction[0].transaction_status}</option>  
        <option value="successful">Successful</option>  
        <option value="blocked">Blocked</option>  
        <option value="approved">Approved</option>  
        </select> 
        {/* <input className={style.inputL} type="text" name="tstatus" {...register('tstatus', { required: true })} defaultValue={tstatus} onChange={(e) => setTstatus({ tstatus: e.target.value })} /> */}
         <label className="form-label">Transaction Status</label>

         <button className={style.button} type="submit">SAVE</button>

      </form>
    </div>
    </>
  )
}
export async function getServerSideProps(context){
  console.log('id is ' + context.query.id)
  var user_id = context.query.id
  const res = await fetch(process.env.NEXT_PUBLIC_URL +`/api/transaction/${user_id}`);
  const data = await res.json();
  return {
    props: { data }
  }
}

export default tranx