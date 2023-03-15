import React from 'react'
import axios from "axios";
import Circle from "../components/Circle";
import style from "../styles/Contact.module.css";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import AdminNav from "../components/AdminNav";

function Register() {

  const { handleSubmit, register, formState: { errors } } = useForm();
  const router = useRouter();
  const onSubmit = async (data) => {
    // data.preventDefault();
    var user = [];
    user = {
      'fName': data.fName,
      'lName': data.lName,
      'phone': data.phone,
      'email': data.email,
      'password': data.password,
      'role': 'client',
      'account': data.account,
      'fund': data.fund, 
      'cdate': data.cdate, 
      'userStatus': 'active'
    }
    let result = await axios.post(
      process.env.NEXT_PUBLIC_URL +`/api/user`,
      user
    );
    router.push('/admin/adminPage'); 
    console.log(result);
  }


  return (
    <>
    <AdminNav/>
    <div className={style.container}>
      <Circle backgroundColor="green" left="-40vh" top="-20vh" className={style.circle} />
      <Circle backgroundColor="yellow" right="-30vh" bottom="-60vh" className={style.circle} />
      <h1 className={style.title}>Register New Client</h1>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <input className={style.inputS}  name="fName" {...register('fName', { required: true })} placeholder="First Name" />
        <input className={style.inputS} type="text" name="lName" {...register('lName', { required: true })} placeholder="Last Name" />
        {errors.fName && <span style={{fontSize:"0.8em", color:"red"}}>First Name is required</span>} {errors.lName && <span style={{fontSize:"0.8em", color:"red"}}>Last Name is required</span>}
        <input className={style.inputL} type="text" name="email" {...register('email', { required: true })} placeholder="Email" />
        {errors.email && <span style={{fontSize:"0.8em", color:"red"}}>Email is required</span>}
        <select className={style.inputS} type="text" name="role" {...register('role', { required: true })} placeholder="Role">
        <option>--Select--</option>  
        <option value="admin">Admin</option>  
        <option value="client">Client</option>  
        </select>
        <input className={style.inputS} type="text" name="account" {...register('account', { required: true })} placeholder="Account Number " />
        {errors.role && <span style={{fontSize:"0.8em", color:"red"}}>Role is required</span>} {errors.account && <span style={{fontSize:"0.8em", color:"red"}}>Account Number is required</span>}

        <input className={style.inputL} type="text" name="phone" {...register('phone', { required: true })} placeholder="Phone Number" />
        {errors.phone && <span style={{fontSize:"0.8em", color:"red"}}>Phone Number is required</span>}
       
        <input className={style.inputL} type="text" name="fund" {...register('fund', { required: true })} placeholder="Initial Fund/Amount" />
        {errors.fund && <span style={{fontSize:"0.8em", color:"red"}}>Fund is required</span>}
        <input className={style.inputL} type="date" name="cdate" {...register('cdate', { required: true })} placeholder="Date" />
        {errors.cdate && <span style={{fontSize:"0.8em", color:"red"}}>Date is required</span>}
        <input className={style.inputL} type="text" name="password" {...register('password', { required: true })} placeholder="Password" />
        {errors.password && <span style={{fontSize:"0.8em", color:"red"}}>Password is required</span>}
        
        <button className={style.button} type="submit">SUBMIT</button>
      </form>
    </div>
</>


  )
}

export default Register