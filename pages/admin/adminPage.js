import React from "react";
import style from "../../styles/Adminpage.module.css";
import AdminNav from "../../components/AdminNav";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import Circle from "../../components/Circle";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

function admin({ data }) {
    const [user, setUser] = useState();
    const [name, setName] = useState();
    const [count, setCount] = useState(1);
    // const [tranx, setTranx] = useState();

    useEffect(() => {
        const fetchData = async () => {
        const singleUser = JSON.parse(localStorage.getItem('user'));
        setUser(singleUser[0].user_id);
        console.log(user);
        const res = await fetch(process.env.NEXT_PUBLIC_URL + `/api/user/${singleUser[0].user_id}`);
        const user = await res.json();
        console.log(user.user[0]);
        setName(user.user[0].cus_last_name + ',' + user.user[0].cus_first_name);
        // const fetchData = async () => {
        //     const res = await fetch(`http://localhost:3000/api/transaction`);
        //     const transactions = await res.json();
        //     console.log(transactions[0]);
        //     setTranx(transactions[0]);
        //     try {
        //         if(tranx) return tranx;
        //     } catch (error) {
        //         return error;
        //     }
        const ress = await fetch(process.env.NEXT_PUBLIC_URL + "/api/transaction2");
        const count = await ress.json();
        console.log(count[0].count);
        setCount(count[0].count);
    };
    fetchData();
        // console.log(result);
    }, [])


    return (
        <>
            <AdminNav />
            <div className={style.container}>

                {/* <div className={`${style.circle} ${style.circle1}`} />
    <div className={`${style.circle} ${style.circle2}`} /> */}
                <Circle backgroundColor="#01c686" top="-45vh" left="-45vh" />
                {/* <Circle backgroundColor="#01c686" right="-40vh" /> */}
                <div className={style.card}>
                    <h1 className={style.title}>
                        Welcome:  <span className={style.brandName}>{name}</span>
                    </h1>
                    <p className={style.desc}>

                    </p>
                </div>

                <div className={style.card2}><br />
                    {/* <p>
                        <button type="button" style={{ width: "40%" }} className="btn btn-primary">
                            <Link href="/register">
                                <i className="bi bi-plus">New Client</i>
                            </Link>
                        </button> </p>
                        <p>
                        <button type="button" style={{ width: "40%" }} className="btn btn-primary">
                            <Link href="/admin/listUsers">
                                <i className="bi bi-plus">View All Client</i>
                            </Link>
                        </button> </p> */}
                    <p className={style.desc}>
                        Number of Transactions:  {count} </p>
                    {/* <br /> <p>Balance:  ${fund} </p> */}
                </div>
            </div><br /><br /><br />
            <div className="card" style={{ paddingTop: 0, width: '100%' }}>
                <h5 className="card-header">Transactions</h5>
                {/* <div className="card-body">
                    <p className="card-text">fund bonus from James on -</p>

                </div> */}
                {/* {data.map(function(d, idx){
         return (<li key={idx}>{d.name}</li>)
       })} */}
                {/* <ul className="list-group list-group-flush">
                    {data.map(function (d, idx) {
                        return (<li className="list-group-item" style={{font:"bold", fontSize:"14px"}}> Tranx: {idx +1}<span style={{color:"red"}}>
                            Client Name: </span>{d.name }, <span style={{color:"red"}}>Iban Number:</span> {d.iban_number}, 
                            <span style={{color:"red"}}>Sort Code: </span>{d.sort_code}, <span style={{color:"red"}}> || Tranx Date:
                            </span> {d.trans_date}, <span style={{color:"red"}}> || Status: </span>{d.transaction_status} || <Link
                        href={{
                            pathname: `/tranx/[id]`,
                            query: {
                                id: d.trans_id, 
                            },
                        }}
                        as={`/tranx/${d.trans_id}`} > Update </Link> </li>)
                    })}
                </ul> */}
                {data ?
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Iban Number</th>
                                <th scope="col">Address</th>
                                <th scope="col">Transaction Date</th>
                                <th scope="col">Status</th>
                                <th scope="col">Edit</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data.map(function (d, idx) {
                                return (<tr>
                                    <th scope="row">{idx + 1}</th>
                                    <td>{d.name}</td>
                                    <td>{d.iban_number}</td>
                                    <td>{d.address}</td>
                                    <td>{d.trans_date}</td>
                                    <td>{d.transaction_status}</td>
                                    <Link
                                        href={{
                                            pathname: `/tranx/[id]`,
                                            query: {
                                                id: d.trans_id,
                                            },
                                        }}
                                        as={`/tranx/${d.trans_id}`} >
                                        <td style={{ cursor: "pointer" }}> <i class="bi bi-pencil-fill"></i> </td>
                                    </Link>
                                </tr>)
                            })}
                        </tbody>
                    </table>

                    : ''}



            </div>
        </>
    )
}
export async function getServerSideProps() {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/transaction");
    const data = await res.json();
    return {
        props: { data },
    };
}

export default admin