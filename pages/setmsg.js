import React from 'react'
import axios from "axios";
import Circle from "../components/Circle";
import style from "../styles/Contact.module.css";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import AdminNav from "../components/AdminNav";

function setmsg() {

  const { handleSubmit, register, formState: { errors } } = useForm();
  const router = useRouter();
  const onSubmit = async (data) => {
    // data.preventDefault();
    var msg = [];
    msg = {
      'msg': data.tstatus,
    }
    let result = await axios.post(
      process.env.NEXT_PUBLIC_URL +`/api/msg`,
      msg
    );
    router.push('/admin/adminPage'); 
  }
  return (
    <>
    <AdminNav/>
    <div className={style.container}>
      <Circle backgroundColor="green" left="-40vh" top="-20vh" className={style.circle} />
      <Circle backgroundColor="yellow" right="-30vh" bottom="-60vh" className={style.circle} />
      <h1 className={style.title}>Set Message</h1>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <select className={style.inputL} type="text" name="tstatus" {...register('tstatus', { required: true })} >
        {/* <option>{data.transaction[0].transaction_status}</option>   */}
        <option value="successful">Successful</option>  
        <option value="blocked">Blocked</option>  
        <option value="approved">Approved</option>  
        </select> 
        <button className={style.button} style={{height:'40px', paddingTop:'0px'}} type="submit"> SET </button>
      </form>
    </div>
</>


  )
}
export default setmsg