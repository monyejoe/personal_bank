import React from 'react';
import Link from "next/link";

function ClientNav() {
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
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            MEMU
          </a>
          <ul className="dropdown-menu">
            <li> <i className="bi bi-house-fill"> </i><Link href="/dashboard"> Dashboard </Link> </li> 
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
export default ClientNav