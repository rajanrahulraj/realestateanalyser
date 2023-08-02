// referencing from https://v5.bootcss.com/docs/5.3/components/navbar/#nav
import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" >

      <div className="container-fluid">
        <i className="bi bi-buildings" style={{ color: 'goldenrod' }}></i>
        <span className="navbar-brand mb-0 h1">Real Estate Analyzer</span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Account</a>
            </li>
            {/* <li class="nav-item">
              <a class="nav-link" href="#">Features</a>
            </li> */}

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                History
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/taxi">Busyness</a></li>
                <li><a className="dropdown-item" href="/price">Real Estate</a></li>

              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Prediction
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/prebusy">Busyness</a></li>
                <li><a className="dropdown-item" href="/preprice">Real Estate</a></li>

              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav >
  )
}

export default Navigation
