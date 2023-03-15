import React from 'react';
import Link from "next/link";

function AdminNav() {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle right" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            MEMU
          </a>
          <ul className="dropdown-menu">
            <li> <i className="bi bi-house-fill"> </i><Link href="/admin/adminPage"> Dashboard </Link> </li> 
            <li> <i className="bi bi-plus"> </i> <Link href="/setmsg">Set Trans Message</Link> </li>
            <li> <i className="bi bi-plus"> </i> <Link href="/register">New client</Link> </li>
            <li> <i className="bi bi-plus"> </i> <Link href="/creditClient/credit">Credit</Link> </li>
            <li> <i className="bi bi-plus"> </i> <Link href="/debitClient/debit">Debit</Link> </li>
            <li> <i className="bi bi-search-heart-fill"> </i><Link href="/admin/listUsers">View all clients</Link></li>
            <li> <i className="bi bi-person-dash-fill"> </i><Link href="/">Log out</Link> </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
</>
  )
}
export default AdminNav