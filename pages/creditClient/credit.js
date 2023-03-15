import React from 'react'
import Link from "next/link";
import AdminNav from "../../components/AdminNav";

function credit({ data }) {
    console.log(data);
    return (
        <> 
        <AdminNav/>
        <div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Namme</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {data.map(function (d, idx) {
                        return (<tr>
                            <th scope="row">{idx + 1}</th>
                            <td>{d.cus_first_name}</td>
                            <td>{d.cus_last_name}</td>
                            <td>{d.amount}</td>
                            <Link
                                href={{
                                    pathname: `/creditClient/[id]`,
                                    query: {
                                        id: d.cus_id, 
                                    },
                                }}
                                as={`/creditClient/${d.cus_id}`} >
                                <td> edit</td>
                            </Link>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>

        
        </>
    )
    //https://anchor.phfeld.com.ng/api/user/6
}
export async function getServerSideProps() {
    const res = await fetch(process.env.NEXT_PUBLIC_URL +"/api/customer");
    const data = await res.json();
    return {
        props: { data },
    };
}
export default credit