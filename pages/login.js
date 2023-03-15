import React from 'react'
import axios from "axios";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

function login() {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const router = useRouter();
  const onSubmit = async (data) => {
    // data.preventDefault();
    var user = [];
    user = {
      'email': data.email,
      'password': data.password
    }
    let result = await axios.post(
      process.env.NEXT_PUBLIC_URL +`/api/login`,
      user
    );
    // console.log(result.status);
     console.log(result.data.user[0].role);
    if (result.status === 200 & result.data.user[0].role === 'client') {
      console.log(result.data.user.role);
      localStorage.setItem("user", JSON.stringify(result.data.user)); 
      router.push('/dashboard');  
    }else if(result.status === 200 & result.data.user[0].role === 'admin'){
      localStorage.setItem("user", JSON.stringify(result.data.user)); 
      console.log(result.data.user.role);
      router.push('/admin/adminPage');  
    } else {
      router.push('/login'); 
    }
  }
  return (
    <section className="vh-70">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" >
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form" className="img-fluid" />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">

                    <form onSubmit={handleSubmit(onSubmit)}>

                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3"></i>
                        <span className="h1 fw-bold mb-0"><i className="bi bi-lock-fill"></i></span>
                      </div>

                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

                      <div className="form-outline mb-4">
                        <label className="form-label">Email address</label>
                        <input type="email" name="email" className="form-control form-control-lg"{...register('email', { required: true })} />
                        {errors.email && <span>Email is required</span>}
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" className="form-control form-control-lg" {...register('password', { required: true })} />
                        {errors.password && <span>Password is required</span>}
                      </div>

                      <div className="pt-1 mb-4">
                        <button className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                      </div>

                      {/* <a className="small text-muted" href="#!">Forgot password?</a> */}
                      {/* <p className="mb-5 pb-lg-2">Don't have an account? <Link href="/register">Register here</Link></p> */}
                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default login